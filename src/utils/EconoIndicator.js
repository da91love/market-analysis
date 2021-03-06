class EconoIndicator{
    static getGrowthRate(_last, _this) {
        return ((_this - _last)/Math.abs(_last)) * 100
    }
}

export default EconoIndicator;