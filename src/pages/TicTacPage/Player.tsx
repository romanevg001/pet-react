export default function Player({initialName, symbol, isActive}) {
    return (<li className={isActive ? 'bg-white' : ''}>{initialName} {symbol}</li>)

}