// Не забудьте перед отправкой изменить в module.exports = function main(game, start) {
// Не деструктурируйте game, ваше решение не будет проходить тесты.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default function main(game, start) {
    let result = undefined;
    const state = (x, y) => __awaiter(this, void 0, void 0, function* () {
        return game.state(x, y).then((st1) => st1);
    });
    const state2 = (x, y) => __awaiter(this, void 0, void 0, function* () {
        return game.state(x, y).then(() => ({ x: x, y: y }));
    });
    const right = (x, y) => __awaiter(this, void 0, void 0, function* () {
        return game.right(x, y);
    });
    const left = (x, y) => __awaiter(this, void 0, void 0, function* () {
        return game.left(x, y);
    });
    const down = (x, y) => __awaiter(this, void 0, void 0, function* () {
        return game.down(x, y);
    });
    const up = (x, y) => __awaiter(this, void 0, void 0, function* () {
        return game.up(x, y);
    });
    const blockDeadEnd = (stepOutOfDeadEnd, arr) => {
        if (stepOutOfDeadEnd == 'right') {
            arr = arr.filter((el) => {
                return el[0] != 'left';
            });
        }
        else if (stepOutOfDeadEnd == 'left') {
            arr = arr.filter((el) => {
                return el[0] != 'right';
            });
        }
        else if (stepOutOfDeadEnd == 'bottom') {
            arr = arr.filter((el) => {
                return el[0] != 'top';
            });
        }
        else if (stepOutOfDeadEnd == 'top') {
            arr = arr.filter((el) => {
                return el[0] != 'bottom';
            });
        }
        return arr;
    };
    const firstToUndefined = (arr, map, xx, yy, main) => {
        arr.forEach((el) => {
            if (el[0] == 'right' && map[xx + 1][yy] == undefined) {
                el[1] = 0;
            }
            else if (el[0] == 'left' && map[xx - 1][yy] == undefined) {
                el[1] = 0;
            }
            else if (el[0] == 'bottom' && map[xx][yy + 1] == undefined) {
                el[1] = 0;
            }
            else if (el[0] == 'top' && map[xx][yy - 1] == undefined) {
                el[1] = 0;
            }
        });
        if (yy == 0 && !main) {
            const bottom1 = arr.find((el) => el[0] === 'bottom');
            if (bottom1 != undefined && bottom1[1] == 0) {
                arr.sort((a, b) => a[0].localeCompare(b[0]));
            }
        }
        else {
            arr = arr.sort((a, b) => {
                return a[1] > b[1] ? 1 : -1;
            });
        }
        return arr;
    };
    const blockDown = (arr) => {
        arr = arr.filter((el) => {
            return el[0] != 'bottom';
        });
        return arr;
    };
    const mainFunction = (main, xx = 0, yy = 0, trash = false) => __awaiter(this, void 0, void 0, function* () {
        let stepOutOfDeadEnd = '';
        while (true) {
            if (main && result != undefined) {
                return result;
            }
            if ((!main && yy == 0 && trash) || (!main && result)) {
                return;
            }
            if (yy == 25) {
                trash = true;
            }
            let st = {};
            if (map[xx][yy] == undefined) {
                st = yield state(xx, yy);
                map[xx][yy] = Object.assign({}, st);
            }
            if (st.bottom && main && yy == 0) {
                mainFunction(false, xx, yy);
            }
            const ar_st = Object.entries(map[xx][yy]);
            const ar_st2 = ar_st.filter((el) => {
                return el[1] === true && el[0] != 'start' && el[0] != 'finish';
            });
            if (map[xx][yy].arr == undefined) {
                map[xx][yy].arr = ar_st2;
            }
            if (stepOutOfDeadEnd != '') {
                map[xx][yy].arr = blockDeadEnd(stepOutOfDeadEnd, map[xx][yy].arr);
            }
            if (yy > 26) {
                map[xx][yy].arr = blockDown(map[xx][yy].arr);
            }
            const step = 0;
            map[xx][yy].arr = firstToUndefined(map[xx][yy].arr, map, xx, yy, main);
            map[xx][yy].arr[step][1] = map[xx][yy].arr[step][1] + 1;
            if (map[xx][yy].arr.length == 1) {
                stepOutOfDeadEnd = map[xx][yy].arr[step][0];
            }
            else {
                stepOutOfDeadEnd = '';
            }
            if (st.finish) {
                result = yield state2(xx, yy);
                return result;
            }
            else if (map[xx][yy].arr[step][0] == 'right') {
                yield right(xx, yy);
                xx = xx + 1;
            }
            else if (map[xx][yy].arr[step][0] == 'bottom') {
                yield down(xx, yy);
                yy = yy + 1;
            }
            else if (map[xx][yy].arr[step][0] == 'left') {
                yield left(xx, yy);
                xx = xx - 1;
            }
            else if (map[xx][yy].arr[step][0] == 'top') {
                yield up(xx, yy);
                yy = yy - 1;
            }
        }
    });
    const map = new Array(50);
    for (var i = 0; i < map.length; i++) {
        map[i] = new Array(50);
    }
    return mainFunction(true);
}
