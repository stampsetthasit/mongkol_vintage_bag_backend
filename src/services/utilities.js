const pointCal = (priceTotal) => {
    let total = priceTotal;
    var point = 0
    point = 0
    if (total >= 3000 && total < 10000) {
        return point = (total / 100)
    }
    else if (total >= 10000 && total < 25000) {
        return point = (total / 80)
    }
    else if (total >= 25000 && total < 35000) {
        return point = (total / 65)
    }
    else if (total >= 35000) {
        return point = (total / 50)
    }
    else {
        return "Price lower than 3,000 THB"
    }

};

exports.pointCal = pointCal;