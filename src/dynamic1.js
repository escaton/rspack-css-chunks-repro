import './dynamic1.crit1.css?critical'
import './dynamic1.crit2.css?critical'
import './dynamic1.css'

export function render() {
    const el = document.createElement('div')
    el.classList.add('text')
    document.getElementsByTagName('body')[0].appendChild(el)
    el.innerHTML = 'hello, world'
}