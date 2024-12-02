export default function Difficulty({mode}){
    return(
        <div>
            <button name="easy" onClick={mode}>Easy</button>
            <button name="medium" onClick={mode}>Medium</button>
            <button name="hard" onClick={mode}>Hard</button>
        </div>
    )
}