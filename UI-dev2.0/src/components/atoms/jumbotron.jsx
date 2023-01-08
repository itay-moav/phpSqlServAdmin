export default function Jumbotron({children,style,className}){
    return <div style={style} className={`jumbotron ${className}`}>{children}</div>
}
