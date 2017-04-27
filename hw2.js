function findPoint(p1, q1, p2, q2, x1, y1, x2, y2){
    var a, b, c, a2, b2, c2;
    var x, y;
    a = q2 - q1;
    b = p1 - p2;
    c = p2*q1 - p1*q2;
    a2 = y2 - y1;
    b2 = x1 - x2;
    c2 = x2*y1 - x1*y2;
    x = (b2*c - b*c2) / (a2*b - a*b2);
    y = -(a2*c - a*c2) / (a2*b - a*b2);
    return [x, y];
}

var ans;
ans = findPoint(1, 1, 3, 3, 2, 2, 3, 0);
console.log("x = " + ans[0] + "\ny = " + ans[1]);
