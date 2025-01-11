# MRAA Common Library

[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)

This project is a collection of common web components for use in MRAA web applications. The primary purpose of this initial version is to provide a common set of data source definitions across all MRAA web applications.

It is deployed as a library to the Google Apps Script environment.

## Google Sheets Exposed for Read-Only Access

-  `Member Master.Member Directory`
-  `Member Master.Dues Payments`
-  `Member Master.Board Members`
-  `Call For Entries.Exhibits`
-  `Call For Entries.Payments`
-  `Call For Entries.Payments Dashboard`
-  `Call For Entries.Total By Exhibit Name`
-  `Call For Entries.Config`
-  `Call For Entries.AppSettins`
-  `Call For Entries.Open Calls`

## Properties

### member master.member directory

-  email {email}
-  firstname {string}
-  lastname {string}
-  preferredname {string}
-  status {active/inactive/pending/removed/memoriam/resigned}
-  streetaddress {string}
-  streetaddressextended {string}
-  city {string}
-  state {string}
-  zipcode {string}
-  primarycontactnumber {string}
-  alternatecontactnumber {string}
-  membership {student/associate/exhibiting jury/exhibiting/honorary/memoriam}
-  jurydate {mm/yyyy}
-  medium {string}
-  datejoined {mm/yyyy}
-  artistsignature {string}
-  buisnessname {string}
-  comments {string}
-  boardmember {true/false}
-  boardrole {list}
   -  president
   -  treasurer
   -  publicity
   -  web master
   -  communications
   -  technology
   -  exhibits
   -  membership
   -  programming
   -  recording secretary
   -  gallery
   -  past president
-  jurycommittee {true/false}
-  website {string}
-  instagram {string}
-  includeindirectory {yes/no}

### member master.dues payments

-  email {email}
-  paymentdate {mm/dd/yyyy}
-  grossamount {number}
-  netamount {number}
-  paymentmethod {list}
   -  cash
   -  check
   -  paypal
   -  awarded
-  comments {string}
-  lastname {string}
-  firstname {string}
-  membership {string}
-  phonenumber {string}
-  businessname {string}
-  forartisprofilepage {string}

### member master.board members

-  boardrole {list}
   -  president
   -  treasurer
   -  publicity
   -  web master
   -  communications
   -  technology
   -  exhibits
   -  membership
   -  programming
   -  recording secretary
   -  gallery
   -  past president
-  lastname {string}
-  firstname {string}
-  email {email}
-  totalboardmembers {number} [appears only in the first row of the sheet]

### call for entries.exhibits

-  exhibitid {string}
-  exhibittitle {string}
-  firstname {string}
-  lastname {string}
-  email {email}
-  phonenumber {string}
-  worktitle {string}
-  medium {string}
-  width {number}
-  height {number}
-  price {number}
-  filename {string}
-  galleryfileid {string}
-  member {yes/no}
-  availability [not used at this time]
-  hidden {true/false} [not used at this time]
-  fullname {string}
-  timestamp {datetime}
-  securitytoken {string}
-  paid {true/false} [not used at this time]
-  squareinches {number} [not used at this time]

### call for entries.payments

-  exhibitid {string}
-  exhibittitle {string}
-  exhibitlocation {string}
-  artistemail {email}
-  artistlastname {string}
-  artistfirstname {string}
-  quantityentered {number}
-  amountpaid {number}
-  datereceived {mm/dd/yyyy}
-  timestamp {datetime}

### call for entries.config

-  exhibitid {string}
-  exhibittitle {string}
-  cfeopendate {mm/dd/yyyy hh:mm am/pm}
-  cfeclosedate {mm/dd/yyyy hh:mm am/pm}
-  maxentriesperartist {number}
-  maxentriespershow {number}
-  imagefolderid {string}
-  allownfs {yes/no}
-  status {open/closed/planning}
-  payfeeonly {yes/no} [intended for material purchases]
-  purchaselimit {number} [intended for material purchases]
-  showopendate {mm/dd/yyyy}
-  showclosedate {mm/dd/yyyy}
-  entryfee {number}
-  registrationlink {string}
-  applicationversion {string}
-  feestructure {string} [not used at this time]
-  maxprice {number} [not used at this time]
-  showfee {number} [not used at this time]
-  location {string}
-  entryfeecashdiscount {number}
-  test {true/false} [used to identify test exhibits]

### call for entries.appsettings

-  maximagesizemb {number}
-  cfecontact {email}
-  statuslist {list}
   -  planning
   -  open
   -  closed
-  applicationlink {string}
-  applicationversion {string}
-  feestructurekey {string}
-  feestructurevalue {string}
-  pricelimit {yes/no}
-  treasurername {string}
-  treasureremail {string}
-  confirmationdocumentid {string}
-  destinationfolderid {string}

### call for entries.opencalls

-  cfeclosedate {mm/dd/yyyy}
-  exhibitid {string}
-  exhibittitle {string}
-  maxxentriesperartist {number}
-  entryfee {number}
-  imagefolderid {string}

### call for entries.total by exhibit name

-  exhibittitle {string}
-  artistlastname {string}
-  artistfirstname {string}
-  quantityentered {number}
-  amountpaid {number}

## Usage

[See the USAGE file for usage examples.](docs/USAGE.MD)
