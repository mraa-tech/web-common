# MRAA Common Library Usage
[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)

## Methods
### Member Master
### getMemberByEmail('joe@example.com') -> {object}
#### Parameters
- email {string}
#### Returns
- {object} member object
#### Example

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

### getDuesPayments() -> {object}
#### Returns
- {object} dues payments object
#### Example

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

### getBoardMembers() -> {array of objects}
#### Returns
- {array of objects} board members
#### Example

```    
const boardMembers = MRAACommonLibraries.getBoardMembers()
if (!isEmptyObject(boardMembers)) {
  for (let i = 0; i < boardMembers.length; i++) {
      Logger.log(boardMembers[i].boardrole)
  }
}
```
### Call for Entries
### getExhibitEntriesById(id) -> {array of objects}
#### Parameters
- id {string}
#### Returns
- {array of objects} exhibit entries
#### Example

```
const entries = getExhibitEntriesById("176BD2A")

Logger.log(`Entries for exhibit ${entries[0].exhibittitle}`)

for (let i = 0; i < entries.length; i++) {
  Logger.log(entries[i].worktitle)
}
```

### getOpenCalls() -> {array of objects}
#### Returns array of open call objects
#### Example
```
const openCalls = MRAACommonLibraries.getOpenCalls()
  
for (let i = 0; i < openCalls.length; i++) {
  Logger.log(openCalls[i].exhibittitle)
}
```

### getPaymentsDue() -> {array of objects}
#### Returns array of payments due objects
#### Example

```
const paymentsDue = MRAACommonLibraries.getPaymentsDue()

for (let i = 0; i < paymentsDue.length; i++) {
  Logger.log(paymentsDue[i].exhibittitle)
  Logger.log(`Amount paid for this entry: $${Number(paymentsDue[i].amountpaid).toFixed(2)}`)
}
```

### getCFEAppSettings() -> {object}
#### Returns CFE application settings
#### Example
```
const appSettings = MRAACommonLibraries.getCFEAppSettings()
Logger.log(appSettings.applicationlink)
Logger.log(appSettings.applicationversion)
```

### getExhibitConfigById(id) -> {object}
#### Parameters exhibit id
#### Returns exhibit config object
#### Example
```
const config = MRAACommonLibraries.getExhibitConfigById("176BD2A")
Logger.log(config.exhibittitle)
Logger.log(config.location)
Logger.log(config.status)
```
### Utilities
### getMasterMemberId() -> {string}
#### Returns the spreadsheet id for the master member file
#### Example
```
const masterMemberId = MRAACommonLibraries.getMasterMemberId()
Logger.log(masterMemberId)
```
### getCallForEntriesId() -> {string}
#### Returns the spreadsheet id for the call for entries file
#### Example
```
const callForEntriesId = MRAACommonLibraries.getCallForEntriesId()
Logger.log(callForEntriesId)
```

### buildTableSchema(sheet, headerRow) -> {object}
#### Parameters
- sheet - sheet object
- headerRow - [optional] row number of header row,
 defaults to 1
#### Returns
- object with the following properties:
  - columns - field names that match the header row
- note: if a column is missing from the header row (blank), it will not be included in the schema
#### Example

```
const schema = MRAACommonLibraries.buildTableSchema(sheet)
Logger.log(schema.length)
```

### isEmptyObject(obj) -> {boolean}
#### Parameters
- object - object to check
#### Returns
- true if object is empty, false otherwise
#### Example

```
const member = getMemberByEmail("joe@example.com")
Logger.log(isEmptyObject(member) ? "No member found" : member)
```

### isMemberActive(email) -> {boolean}
#### Parameters email
#### Returns true if member is active, false otherwise
#### Example
```
const member = MRAACommonLibraries.getMemberByEmail("joe@example.com")
Logger.log(Is status active for ${member.firstname} ${member.lastname}? ${
          MRAACommonLibraries.isMemberActive("joe@exampl.com") ? "yes" : "no"
        })
```

### ### isMemberExhibitor(email) -> {boolean}
#### Parameters email
#### Returns true if member is an exhibitor, false otherwise
#### Example
```
Logger.log(Is member an Exhibitor? ${MRAACommonLibries.isMemberExhibitor("joe@exampl.com") ? "yes" : "no"})
```
### Table Metadata
#### Table Metadata are manually created objects that describe the structure of the MRAA tables/sheets. This includes but is not limited to:
- Table/sheet name
- Number of header rows
- Number of total or summary rows if they exist. Only pivot tables have summary rows
- The type of table it is
   - Standard table, data in columns and rows
   - Pivot table, a single pivot table; a summarized table of data from a standard table
   - Dashboard, a sheet that contains multiple pivot tables

### getCFEExhibitsMetadata() -> {object}
#### Returns exhibit metadata object
#### Example
```
const exhibitsMetadata = MRAACommonLibraries.getCFEExhibitsMetadata()
Logger.log(exhibitsMetadata.name)
Logger.log(exhibitsMetadata.type)
Logger.log(exhibitsMetadata.headers)
```
#### getCFEPaymentsMetadata() -> {object}
#### Returns payments metadata object
#### Example
```
const paymentsMetadata = MRAACommonLibraries.getCFEPaymentsMetadata()
Logger.log(paymentsMetadata.name)
Logger.log(paymentsMetadata.type)
Logger.log(paymentsMetadata.headers)
```
### getCFEConfigMetadata() ->  {object}
#### Returns config metadata object
#### Example
```
const configMetadata = MRAACommonLibraries.getCFEConfigMetadata()
Logger.log(configMetadata.name)
Logger.log(configMetadata.type)
Logger.log(configMetadata.headers)
```
### getCFEAppSettingsMetadata() -> {object}
#### Returns app settings metadata object
#### Example
```
const appSettings Metadata = MRAACommonLibraries.getCFEAppSettingsMetadata()
Logger.log(appSettingsMetadata.name)
Logger.log(appSettingsMetadata.type)
Logger.log(appSettingsMetadata.headers)
```
### getCFEOpenCallsMetadata() -> {object}
#### Returns open calls metadata object
#### Example
```
const openCallsMetadata = MRAACommonLibraries.getCFEOpenCallsMetadata()
Logger.log(openCalls.name)
Logger.log(openCalls.type)
Logger.log(openCalls.headers)
Logger.log(openCalls.summary)
```
### getCFEPaymentDashboardMetadata() -> {object}
#### Returns payment dashboard metadata object
#### Example
```
const paymentDashboardMetadata = MRAACommonLibraries.getCFEPaymentDashboardMetadata()
Logger.log(paymentDashboardMetadata.name)
Logger.log(paymentDashboardMetadata.type)
Logger.log(paymentDashboardMetadata.headers)
Logger.log(paymentDashboardMetadata.summary)
```
### getMemberMetadata() -> {object}
#### Returns member metadata object
#### Example
```
const memberMetadata = MRAACommonLibraries.getMemberMetadata()
Logger.log(memberMetadata.name)
Logger.log(memberMetadata.type)
Logger.log(memberMetadata.headers)
```
### getDuesPaymentsMetadata() -> {object}
#### Returns dues payments metadata object
#### Example
```
const duesPaymentsMetadata = MRAACommonLibraries.getDuesPaymentsMetadata()
Logger.log(duesPaymentsMetadata.name)
Logger.log(duesPaymentsMetadata.type)
Logger.log(duesPaymentsMetadata.headers)
Logger.log(duesPaymentsMetadata.summary)
```
### getBoardMembersMetadata() -> {object}
#### Returns board members metadata object
#### Example
```
const boardMembersMetadata = MRAACommonLibraries.getBoardMembersMetadata()
Logger.log(boardMembersMetadata.name)
Logger.log(boardMembersMetadata.type)
Logger.log(boardMembersMetadata.headers)
```
