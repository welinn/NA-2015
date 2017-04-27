//六次多項式求根
var coef = [1, -10.84, 8.4, 0, 1, -10.84, 8.4];
function evaluator(input, x, dofdx){
    var fx, fdx;
    var x6, x5, x4, x3, x2;
    fx = (((((input[0]*x + input[1])*x + input[2])*x + input[3])*x + input[4])*x + input[5])*x + input[6];
    if(dofdx !== undefined){
        fdx =((((6*input[0]*x + 5*input[1])*x + 4*input[2])*x + 3*input[3])*x + 2*input[4])*x + input[5];
        return [fx, fdx];
    }
    return fx;
}
function bisection(fun, eps, lo, hi){
    var i = 0, fh, fl, fm, xm;
	var input = coef;
    fh = fun(input, hi);
    fl = fun(input, lo);

    if(fh * fl >0) return [i, undefined];
    else if(fh === 0) return [i, hi];
    else if(fl === 0) return [i, lo];

    while(hi - lo > eps){
        i++;
        xm = (hi+lo)/2;

//        console.log(xm + "\n");

        fm = fun(input, xm);
        if(fm === 0){
            return [i, xm];
	    }
        else if(fm * fl < 0){
            fh = fm;
            hi = xm;
        }
        else{
            fl = fm;
            lo = xm;
        }
    }
    return [i, (hi+lo)/2];
}
/*
 取hi和lo的中間值作為下一次的區間上/下限
 */

function newton(fun, epsilon, x0){
    var eps = epsilon || 1e-4;
    var f, stop = 20, x, input = coef;

    for(var i = 0; i < stop; i++){
        f = fun(input, x0, 1);
        x = x0 - f[0]/f[1];
//        console.log(x + "\n");

        if(Math.abs(x - x0) < eps){   //變化量少
            i++;
            break;
        }
        x0 = x;
    }
    return [i, x];
}

/*
 (y-y0) = m(x-x0)    點斜式
 (x0, y0) 為已知點(上一次用的點)
 y0 = f(x0)
 要用的下一點為此切線和X軸的交點之X座標
 => 令y = 0
 -y0 = m(x-x0)
 x = (m*x0 - y0)/m
   = x0 - y0/m
   = x0 - fx/fdx

 */
var bi, ne;
bi = bisection(evaluator, 1e-6, 0, 1);
ne = newton(evaluator, 1e-6, 0.5);
console.log("bisection : iterations = " + bi[0] + ", root = " + bi[1] + "\nnewton : iterations = " + ne[0] + ", root = " + ne[1]);
