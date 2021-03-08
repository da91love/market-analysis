class EconoIndicator{
    static getGrowthRate(_last, _this) {
        if (_last === 0) {
            return ((_this - 1)/Math.abs(1)) * 100     
        } else {
            return ((_this - _last)/Math.abs(_last)) * 100
        }
    }

    static getGacr(_last, _this) {
        if (_last === 0) {
            return ((_this - 1)/Math.abs(1)) * 100
        } else {
            return ((_this - _last)/Math.abs(_last)) * 100
        }
    }
}

export default EconoIndicator;