---
path: /blog/unit-testing-required
title: Unit Testing Required
date: 2018-01-26
---

Its been my experience that most companies do not practice unit testing at all. Sometimes its an Agile environment where devs are pushing to increase velocity so they skip writing unit tests offloading the responsibility to functional testing via Selenium. Other times devs just refuse to write any tests because management doesn't make them. The result is the same however. Poorly written code, increasingly complex testing scenarios and difficult deployments. These are all red flags that you aren't testing the write things in the right ways.

To management Selenium and automated testing is a silver bullet for their manual QA pains. Long test cycles, missed bugs, redundant testing. Problem deploying to production? Prepare to start the test cycle from the beginning depending on how complex the fix is. Every new feature is more increases the test cycle times. Even with two week sprints are so busy regression testing that they can't put any time towards exploratory testing. Then management hears about automated testing. This will free up our manual QAers for exploratory testing and speed up deployments.

The problem is that none of the devs are writing any unit tests so QA creates a test case for every possible scenario to cover this missing test coverage. A common mistake when automating manual test cases are that they have to be 1:1 translations. This makes it all nice for tracking in Quality Center but this doesn't always make sense. It can also create needlessly complex automation/test cases because the translation was so literal.

Another problem is that while you can automate pretty much everything that doesn't mean that you should. Sometimes it just makes more sense for manual QAers to check it. One example would be a page displaying streaming data. In production this data would flow in quickly but in test it could be very slow. What is the threshold for failure if data will eventually flow through? Another example is automation to input data in to an application then testing queried values from the database. Often times its value validation which requires knowledge of the application's internals. This can lead to duplicating business logic and brittle non deterministic tests. Did it fail due to a legitimate bug or because our implementation of the business logic is out of date? This is a maintenance nightmare.

So how does unit testing fix all this? When does automated testing make sense? Lets go back to the database example. The database is just an implementation detail. It stores data but rarely transforms the data. This is usually a function/class in the code base. The value validation should occur in the unit tests for that function/class.

Comprehensive unit tests like this have a number of benefits. Devs can find bugs locally which will increase their productivity. Changes can be make fearlessly providing that the tests are kept up to date. This also removes the responsibility of the Selenium tests to test this value. We can trust that the value is correct because we have unit tests that prove it. This level of confidence will make deployments much smoother and bring you closer to the holy grail of continuous deployment.
