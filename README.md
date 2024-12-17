# Web Common

This project is a collection of common web components for use in MRAA web applications. The primary purpose of this initial version is to provide a common set of data source definitions across all MRAA web applications.

It is deployed as a library to the Google Apps Script environment.

## Google Sheets Exposed for Read-Only Access
* `Member Master.Member Directory`
* `Member Master.Dues Payments`
* `Member Master.Board Members`
* `Call For Entries.Exhibits`
* `Call For Entries.Payments` 
* `Call For Entries.Config`
* `Call For Entries.AppSettins`
* `Call For Entries.Open Calls`

## Properties
### member master.member directory
- email {email}
- firstname {string}
- lastname {string}
- preferredname {string}
- status {active/inactive/pending/removed/memoriam/resigned}
- streetaddress {string}
- streetaddressextended {string}
- city {string}
- state {string}
- zipcode {string}
- primarycontactnumber {string}
- alternatecontactnumber {string}
- membership {student/associate/exhibiting jury/exhibiting/honorary/memoriam}
- jurydate {mm/yyyy} 
- medium {string}
- datejoined {mm/yyyy}
- artistsignature {string}
- buisnessname {string}
- comments {string}
- boardmember {true/false}
- boardrole {president/treasurer/publicity/web master/communications/technology/exhibits/membership/programming/recording secretary/gallery/past president}
- jurycommittee {true/false}
- website {string}
- instagram {string}
- includeindirectory {yes/no}

### member master.dues payments
- email {email}
- paymentdate {mm/dd/yyyy}
- grossamount {number}
- netamount {number}
- paymentmethod {cash/check/paypal/awarded}
- comments {string}
- lastname {string}
- firstname {string}
- membership {string}
- phonenumber {string}
- businessname {string}
- forartisprofilepage {string}

### member master.board members
- boardrole {president/treasurer/publicity/web master/communications/technology/exhibits/membership/programming/recording secretary/gallery/past president}
- lastname {string}
- firstname {string}
- email {email}
- totalboardmembers {number} [appears only in the first row of the sheet]

### call for entries.exhibits
- exhibitid {string}
- exhibittitle {string}
- firstname {string}
- lastname {string}
- email {email}
- phonenumber {string}
- worktitle {string}
- medium {string}
- width {number}
- height {number}
- price {number}
- filename {string}
- galleryfileid {string}
- member {yes/no}
- availability [not used at this time]
- hidden {true/false} [not used at this time]
- fullname {string}
- timestamp {datetime}
- securitytoken {string}
- paid {true/false} [not used at this time]
- squareinches {number} [not used at this time]

### call for entries.payments
- exhibitid {string}
- exhibittitle {string}
- exhibitlocation {string}
- artistemail {email}
- artistlastname {string}
- artistfirstname {string}
- quantityentered {number}
- amountpaid {number}
- datereceived {mm/dd/yyyy}
- timestamp {datetime}

### call for entries.config
- exhibitid {string}
- exhibittitle {string}
- cfeopendate {mm/dd/yyyy hh:mm am/pm}
- cfeclosedate {mm/dd/yyyy hh:mm am/pm}
- maxentriesperartist {number}
- maxentriespershow {number}
- imagefolderid {string}
- allownfs {yes/no}
- status {open/closed/planning}
- payfeeonly {yes/no} [intended for material purchases]
- purchaselimit {number} [intended for material purchases]
- showopendate {mm/dd/yyyy}
- showclosedate {mm/dd/yyyy}
- entryfee {number}
- registrationlink {string}
- applicationversion {string}
- feestructure {string} [not used at this time]
- maxprice {number} [not used at this time]
- showfee {number} [not used at this time]
- location {string}
- entryfeecashdiscount {number} 
- test {true/false} [used to identify test exhibits]

### call for entries.appsettings
- maximagesizemb {number}
- cfecontact {email}
- statuslist {planning/open/closed}
- applicationlink {string}
- applicationversion {string}
- feestructurekey {string}
- feestructurevalue {string}
- pricelimit {yes/no}
- treasurername {string}
- treasureremail {string}
- confirmationdocumentid {string}
- destinationfolderid {string}

### call for entries.opencalls
- cfeclosedate {mm/dd/yyyy}
- exhibitid {string}
- exhibittitle {string}
- maxxentriesperartist {number}
- entryfee {number}
- imagefolderid {string}

## Methods
### Member Master
getMemberByEmail('joe@example.com') -> {object}

``` 
const member = getMemberByEmail("joe@example.com")
Logger.log(isEmptyObject(member) ? "No member found" : member)

if (!isEmptyObject(member)) {
  Logger.log(
      `Is status active for ${member.firstname} ${member.lastname}? ${
        isMemberActive("joe@example.com") ? "yes" : "no"
      }`
  )
  Logger.log(
      `Is member an Exhibitor? ${
        isMemberExhibitor("joe@example.com") ? "yes" : "no"
      }`
  )
}
```

getDuesPayments() -> {object}

``` 
const duesPayments = MRAACommonLibraries.getDuesPayments() 
const data = duesPayments.data
const totals = duesPayments.totals

for (let i = 0; i < data.length; i++) {
  Logger.log(data[i].lastname)
}

for (let i = 0; i < totals.length; i++) {
  Logger.log(totals[i].netamount.toFixed(2))
}

```

getBoardMembers() -> {array of objects}

```    
const boardMembers = MRAACommonLibraries.getBoardMembers()
if (!isEmptyObject(boardMembers)) {
  for (let i = 0; i < boardMembers.length; i++) {
      Logger.log(boardMembers[i].boardrole)
  }
}
```
### Call for Entries
getExhibitEntriesById(id) -> {array of objects}

```
const entries = getExhibitEntriesById("176BD2A")

Logger.log(`Entries for exhibit ${entries[0].exhibittitle}`)

for (let i = 0; i < entries.length; i++) {
  Logger.log(entries[i].worktitle)
}
```

getOpenCalls() -> {array of objects}

```
const openCalls = MRAACommonLibraries.getOpenCalls()
  
for (let i = 0; i < openCalls.length; i++) {
  Logger.log(openCalls[i].exhibittitle)
}
```

getPaymentsDue() -> {array of objects}

```
const paymentsDue = MRAACommonLibraries.getPaymentsDue()

for (let i = 0; i < paymentsDue.length; i++) {
  Logger.log(paymentsDue[i].exhibittitle)
  Logger.log(`Amount paid for this entry: $${Number(paymentsDue[i].amountpaid).toFixed(2)}`)
}
```

getCFEAppSettings() -> {object}
```
const appSettings = MRAACommonLibraries.getCFEAppSettings()
Logger.log(appSettings.applicationlink)
Logger.log(appSettings.applicationversion)
```

getExhibitConfigById(id) -> {object}
```
const config = MRAACommonLibraries.getExhibitConfigById("176BD2A")
Logger.log(config.exhibittitle)
Logger.log(config.location)
Logger.log(config.status)
```
### Utilities
isEmptyObject(obj) -> {boolean}
```
const member = getMemberByEmail("joe@example.com")
Logger.log(isEmptyObject(member) ? "No member found" : member)
```

isMemberActive(email) -> {boolean}
```
const member = MRAACommonLibraries.getMemberByEmail("joe@example.com")
Logger.log(Is status active for ${member.firstname} ${member.lastname}? ${
          MRAACommonLibraries.isMemberActive("joe@exampl.com") ? "yes" : "no"
        })
```

isMemberExhibitor(email) -> {boolean}
```
Logger.log(Is member an Exhibitor? ${MRAACommonLibries.isMemberExhibitor("joe@exampl.com") ? "yes" : "no"})
```
