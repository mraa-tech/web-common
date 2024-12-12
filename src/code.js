let _mode = "";
function getMemberEmail() {
    const ssIdLive = "1puqturm6WCBtfL3uaT_YICKHI9StLcPA4SosBuMs4ZY" 
    const ssIdTest = "11mfnGVNA2PhCs5hsp5-bmKhndv7nFg-ZiVVKf1caTqg"
    const ss = SpreadsheetApp.openById(ssIdLive);
    const ssId = (mode=="test") ? ssIdTest : ssIdLive;
    const wsName = (mode=="test") ? "Sheet1" : "Member Directory";
    const statusCol = 4;

    if (mode=="test") {
        return _mode;
    }
}

function ping() {
    return "Hello World";
}

function getMode() {
    return _mode;
}

function setMode(m) {
    _mode = m;
}