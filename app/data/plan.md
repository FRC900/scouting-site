# Team Data Table Implementation

## Backend Step 1: Pull Data

We need to use our data.ts file to pull all of the stand forms from the database.

Consider:
* we may want to find a way to do this in batches, where we pull and process data for each team one at a time as to not overload the system? This may be completely unnecessary though.

## Backend Step 2: Calculate

Create a new file and functions in order to sort an array of all the data entries by team and then average out the data of each team. We want the data returned as an array (or map) where each entry contains all the processed data for that team.

Fields per team:
* Team Number
* Team Name
* Calculated Direct EPA
* OPR?
* Coral per match
* Coral per level per match
* Algae per match
* Algae in processor per match
* Percent matches climbed
* deep vs shallow
* Parked percent
* start zone percent

## Frontend: Table

We need to then deliever all this data to a table from which it can be displayed. Additionally, the team number and/or name needs to link to a custom page for that team where we can show stand form and pit form data specifically for that team.