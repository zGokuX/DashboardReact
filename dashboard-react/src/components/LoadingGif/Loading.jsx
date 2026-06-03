
import loading from '@/assets/Loading.gif'

export default function Loading({height , ...props}){
    return(
        <img src={loading} width={105} height={height}></img>
    )
}