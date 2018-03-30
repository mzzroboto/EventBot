# EventBot 

Own Your Event

EventBot is an open source photo sharing project for people who want to own the photos from their events. Normal events force users to pick an online photo sharing service or post photos online which forces users to signup for services and have all their photos shared on the internet. Eventbot is a secure box with just a Raspberry Pi and a hard drive. It's not connected to the internet but users access a local web page where they can post and see live photos from the event. When it's done, the organizer just walks away with the original photos and videos and can choose to post the photos any way they choose. 

# Build

[![Snap Status](https://build.snapcraft.io/badge/robotnyc/EventBot.svg)](https://build.snapcraft.io/user/robotnyc/EventBot)

## Manual Build

1. `snapcraft`
1. `snapcraft push eventbot_1.0.0_amd64.snap --release=beta`

# Run

1. (once) `npm install`
1. `node eventbot.js`


