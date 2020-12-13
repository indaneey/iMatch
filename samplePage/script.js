//import  { iMatch } from '../dist/imatch.min.js'

var baba = new iMatch('.container')
baba.compare({
    direction: 'HORIZONTAL',
    animation: true,
    lineClassName: 'line',
    arrowClassName: 'dot'
})

var mama = new iMatch('.container1')
mama.compare({
    direction: 'horizontal',
    animation: true,
    lineClassName: 'line',
    arrowClassName: 'dot'
})
var kaka = new iMatch('.container2')
kaka.compare({
    direction: 'vertical',
    animation: true,
    lineClassName: 'line',
    arrowClassName: 'dot'
})
