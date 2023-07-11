import { Container } from "./styles";



export function Input({icon:Icon, ...rest}){ //Make pharse icon for 'I'Con
    return(
        //&& -> condition If tRUE
        <Container>
            {Icon && <Icon size={20}/>}  
            <input {...rest}/>
        </Container>
    )
    
}
