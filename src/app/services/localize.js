let moment = require('moment');

export class LocalizeServiceClass {
    formatPath(path,data){
        let formattedPath;
        for(let key in data) {
            formattedPath = path.replace(":" + key, data[key])
        }
        return formattedPath;
    }

    formatTimestampFromNow(timeStamp){
        return moment(timeStamp).startOf('minute').fromNow();
    }
}

export let LocalizeService = new LocalizeServiceClass();