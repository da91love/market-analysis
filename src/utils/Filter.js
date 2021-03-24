class Filter {
    static rawDataNumber(rawData, tgKey, min, max) {
        const result = [];
        rawData.forEach((data,i) => {
            if (Filter.number(data[tgKey], min, max)) {
                result.push(data[tgKey]);
            }
        });

        return result;
    }

    static rawDataString(rawData, tgKey, str) {
        const result = [];
        rawData.forEach((data,i) => {
            if (Filter.string(data[tgKey], str)) {
                result.push(data[tgKey]);
            }
        });

        return result;
    }

    static number(value, min, max) {
        if (min <= value && value <= max) {
            return value
        } else {
            return false;
        }
    }

    static string(value, str) {
        if (str === value) { // TODO: It should be "if (strList.includes(value)) {"
            return value
        } else {
            return false;
        }
    }
}

export default Filter;