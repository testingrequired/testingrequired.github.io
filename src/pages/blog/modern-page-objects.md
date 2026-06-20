---
path: /blog/modern-page-objects
title: Modern Page Objects
date: 2018-03-23
tags: ['browser-automation', 'page-objects']
---

The page object model is a pattern for abstracting defining and interacting with components in a GUI.

1. Find the logical boundaries of a component: A form
1. Identify elements within the component: An input and a button
1. Interact with this elements: Populate the input and click the button

This dramatically decreases complexity of automation scripts and lowers risk of test breakage "brittleness".

There are many ways to implement this pattern and not a lot of documented best practices around implementing them. Its even been my experience that within monolytic selenium test suites you'll find implementation varies from page object to page object. This contributes to that test bitterness that are common in these type of test suites. It also increases barrier to entry for new developers on a team to contribute to those suites. So they mostly go untouched and eventually forgotten.

Web apps have also changed a lot from the beginning of Selenium's life. Moving from static document based server rendeded jQuery enchanced pages to dynamically code split client side rendered componented based apps ala React, Vue, Angular. The shift from modelling pages to reusable components. This is even less documented.

Of course there are also edge cases in all pages/app where writing a clean page object is difficult. The page/app was never written with selenium testing in mind so you have to be created with how you select and interact with elements. Sometimes there are no clear boundaries.

This post will cover page objects in component based apps, writing a base implementation, discuss best practices and advanced tips.

## Base Implementation

It's important to have a solid base page object to extend from. This is going to contain all the complex logic as well as provide a common API to implement against.

### Webdriver

```javascript
class PageObject {
  constructor(driver) {
    this.driver = driver;
  }
}
```

The `driver` is a reference to the current webdriver instance. It provides methods to interact with the connected browser (select and interact with elements, execute javascript, etc...). This has to be provided at as page object initialization so that it's possible to have multiple webdriver instances at once.

### Defining elements

```javascript
class PageObject {
  constructor(driver) {
    this.driver = driver;
  }

  get someElement() {
    return this.driver.element('#someElement');
  }
}
```

Define a getter function that returns the element. Getters ensure that element references are always fresh. Element references can become [stale](https://www.seleniumhq.org/exceptions/stale_element_reference.jsp) if the element is removed from the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) or the page reloads so it's always safer to requery every time.

### Root element

The root element represents the page object's logical boundary in the DOM. All other elements will be children of this element. We are using `Object.defineProperty` to set the getter `root` so that we can use `this.root` instead of `this.root()`:

```javascript
class PageObject {
  constructor(driver, root) {
    this.driver = driver;

    Object.defineProperty(this, 'root', {
      enumerable: true,
      get: root,
    });
  }

  get someElement() {
    return this.root.element('#someElement');
  }
}
```

### Proxy calls to root

This is a more advanced technique but you can proxy and undefined property/method calls on your page object to the root element. This makes for a terser syntax when selecting elements:

```javascript
class PageObject {
  constructor(driver, root) {
    this.driver = driver;

    Object.defineProperty(this, 'root', {
      enumerable: true,
      get: root,
    });

    return new Proxy(this, {
      get: function(pageObject, prop) {
        if (prop in pageObject) {
          return pageObject[prop];
        }

        if (prop in this.root) {
          return this.root[prop];
        }

        throw new Error(
          `Property ${prop} not defined on PageObject or root element`
        );
      },
    });
  }

  get someElement() {
    return this.element('#someElement');
  }
}
```

This is where page objects and web elements start to blend. From an API perspective the page object and root element are one in the same.

### Return page objects instead of elements

You can override the find element/s methods to accept a page object class and wrap the results in that class.

```javascript
class PageObject {
  constructor(driver, root) {
    this.driver = driver;

    Object.defineProperty(this, 'root', {
      enumerable: true,
      get: root,
    });

    return new Proxy(this, {
      get: function(pageObject, prop) {
        if (prop in pageObject) {
          return pageObject[prop];
        }

        if (prop in this.root) {
          return this.root[prop];
        }

        throw new Error(
          `Property ${prop} not defined on PageObject or root element`
        );
      },
    });
  }

  element(selector, PageObjectClass = PageObject) {
    return new PageObjectClass(this.driver, () => this.root.element(selector));
  }

  elements(selector, PageObjectClass = PageObject) {
    const elements = this.root.elements(selector);
    return elements.reduce(
      (pageObjects, element, i) =>
        new PageObjectClass(this.driver, () => elements[i]),
      []
    );
  }
}
```

A powerful pattern for terse but flexible page objects. This also aligns well since now we can map components from those component based apps direct to page objects and both implementations are reusable.

## Example

```javascript
class LoginForm extends PageObject {
  get username() {
    return this.element('#username');
  }

  get password() {
    return this.element('#password');
  }

  get submitButton() {
    return this.element('input[type=submit]');
  }

  loginWith(username, password) {
    this.username.setValue('username');
    this.password.setValue('password');
    this.submitButton.click();
  }
}

class LoginModal extends PageObject {
  get loginForm() {
    return this.element('.loginForm', LoginForm);
  }
}

class FrontPage extends PageObject {
  get loginModal() {
    return this.element('.modal', LoginModal);
  }

  get loginLink() {
    return this.element('a#login');
  }

  get loginForm() {
    return this.element('.loginForm', LoginForm);
  }
}
```

## Initialzing

The page objects have to be initialized with a webdriver instance and a function returning root web element. They also need to be intialized some common place to be imported by a test/script.

```javascript
const frontpage = new FrontPage(driver, () => driver.element('body'));

module.exports = { frontpage };
```

## App Class

This approach quickly becomes cumbersome as the test suite grows. One pattern for solving that is to implement an app class. It contains page objects representing the different views/pages in the wep app.

```javascript
class YourApp {
  constructor(driver) {
    this.driver = driver;
  }

  get frontpage() {
    return new FrontPage(this.driver, () => this.driver.element('body'));
  }
}

const app = new YourApp(webdriverInstance);

app.frontpage.loginForm.loginWith('username', 'password');
```

## Solving Edge Cases

A previous project I had worked on was writing automation for a vendor web app to automate data entry and validate the app's behavior. I spent a few weeks walking through a manual testing plan, mapping the DOM to page objects while converting them to automated tests. A month after completing this test suite the vendor released a redesign implemented in Bootstrap.

We will save why we are writing automated tests for a vendor product and the lack of communication for another post. Luckily the page objects were written in a way that most of them continued to work. This did break all of the form related page objects. Bootstrap form elements don't use the naive form elements. This is for ease of styling. On top of that selenium was having issues correctly reporting element's visibility. If an element is not visible then selenium will not let you interact with it.

Implementing the pattern above allows you to solve these issues but overriding element methods.

Lets start with the Bootstrap form inputs:

```javascript
class BootstrapInput extends PageObject {
  setValue(value) {
    this.driver.execute(`return arguments[0].value = '${value}'`, this.root);
  }
}
```

Convert our login form page object:

```javascript
class LoginForm extends PageObject {
  get username() {
    return this.element('#username', BootstrapInput);
  }

  get password() {
    return this.element('#password', BootstrapInput);
  }

  get submitButton() {
    return this.element('input[type=submit]');
  }

  loginWith(username, password) {
    this.username.setValue('username');
    this.password.setValue('password');
    this.submitButton.click();
  }
}
```

Or maybe your trying to click on an element you can see but selenium reports it's not visible:

```javascript
class ShimClickable extends PageObject {
  click(value) {
    this.driver.execute(`return arguments[0].click()`, this.root);
  }
}

class LoginForm extends PageObject {
  get username() {
    return this.element('#username', BootstrapInput);
  }

  get password() {
    return this.element('#password', BootstrapInput);
  }

  get submitButton() {
    return this.element('input[type=submit]', ShimClickable);
  }

  loginWith(username, password) {
    this.username.setValue('username');
    this.password.setValue('password');
    this.submitButton.click();
  }
}
```

## Conclusion

I've had huge success implementing this pattern across multiple projects. It makes writing page objects and automation simple and accessible.
