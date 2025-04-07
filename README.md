# ZebraScouting

ZebraScouting is a powerful new scouting site application for recording and processing robot analytics.

## Features Robbie Needs to Remember to Add

### Priority (Big Stuff):

* epa page w/ figures
* combinations / simulation
  * compare page will compare multiple teams.

* remove preloaded from database

* Matches
  * Qual Matches
  * Alliances
  * Elim Matches

* qualitative form submits notes
* qualitative notes are displayed on team data

* improve authentication capability (difficulty hard lmao)
* admin dashboard for updating event key, viewing/editting users.
* change password and delete account function?

* comment everything
* try to make it easier to update for a new game (ideal: just a json file!!)

### Lesser Priority:

* identify/fix buggy-ness with telling you which team you are scouting apon match+slot
* Tell you when you are pit scouting a duplicate (and provide link to edit)
* 404 notice
* improve mobile view (statbotics/tba as inspiration)
* add dealgae
* Ability to factor in the influence of previous competitions

### Bugs

* stand form does not revalidate

### Package Updates

When mantine adds support for React 19 update update NextJS to v15 and everything along with it.
* headers become async
* params and searchParams become async
* GET() route and fetch are no longer cached by default (I dont think this will actually effect anything)

## Completed

* Backend for logging in, logging out, registering.
* Enable authentication
* Team Data Tab system:
  * Insights
  * Breakdown
  * Data
* team report page
* qr code route
* implment specific access requirements (auth)
* Incrementor - stand form
* Tabs - stand form
* end repeating decimals
* fix defaultForm population when updating pit form
* more detailed team report page
* mobile
  * burger nav
* Pit form display for showing what teams have not been pit scouted.
* Blue alliance verification
* redo team data fields

## Cut Features :( (at least for now)

* image submission to pit forms