import(/* webpackChunkName: "dynamic1" */'./dynamic1').then(exports => {
    exports.render()
})
import(/* webpackChunkName: "dynamic2" */'./dynamic2').then(exports => {
    exports.render()
})
