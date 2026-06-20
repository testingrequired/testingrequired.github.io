---
path: /blog/testing-cloudwatch-alarms
title: Testing Cloudwatch Alarms
date: 2018-07-09
tags: ['testing', 'aws']
---

## The Problem

Testing that AWS Cloudwatch alarms are configured correctly, can be triggered and result in an on-call alert. This is rather complex issue due to a number of factors:

1.  Simulating data that will trigger the alarm. Different metrics require different data (CPU, Memory, Network)
1.  The alarm needed to be active for a period of time (5-20 minutes) as the on-call alert is a human process

## Method 1: [set-alarm-state](https://docs.aws.amazon.com/cli/latest/reference/cloudwatch/set-alarm-state.html)

Initially `set-alarm-state` seemed like an ideal candidate. Manual control over the alarm's state.

### Problems

When testing it would change the alarm's state to `ALARM` but it would immedietly toggle back to `OK`. It just wasn't long enough to trigger an on-call alert.

## Method 2: [put-metric-alarm](https://docs.aws.amazon.com/cli/latest/reference/cloudwatch/put-metric-alarm.html)

Use `put-metric-alarm` to update an alarm's configuration so healthy stats will trigger the alarm.

### Problems

This worked but it was complex. You must send all of the alarm's configuration as it overwrites all of the previous values. After testing the on-call alert then the original configuration must be sent back over `put-metric-alarm`. There is risk that the alarm will become misconfigured.

## Method 3: [put-metric-data](https://docs.aws.amazon.com/cli/latest/reference/cloudwatch/put-metric-data.html)

Use `put-metric-data` to send custom metric data designed to trigger the alarm.

The first implementation used javascript's `setInterval` to send the custom metric data once every second. Then the script just needed to be ran for the time required to trigger an on-call alert.

A future iteration could include constructing a timespan of custom metric data and send it on a single request. Or pulling down the alarm's cloudformation template and auto generate the custom metric data.

### Problems

Some companies might feel hesitant to grant permissions to do this. Especially in higher environments.
