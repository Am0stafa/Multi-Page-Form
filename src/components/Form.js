
import useFormContext from "../hooks/useFormContext"
import FormInput from "./FormInput"

const Form = () => {

    const { data,title,page,setPage,handleChange,canSave,handlePrev,handleNext,prevHide,nextHide,submitHide,disablePrev } = useFormContext()
 
    const handleSubmit = e => {
        e.preventDefault()
        console.log(JSON.stringify(data))
    }



    const content = (
        <form className="form flex-col" onSubmit={handleSubmit}>
            <header>
                <h2>{title[page]}</h2>
                <div className="button-container">
                    <button type="button" className={`button ${prevHide}`} onClick={handlePrev} disabled={disablePrev}>
                        Prev
                    </button>
    
                    <button type="button" className={`button ${nextHide}`} onClick={handleNext} disabled={disableNext}>
                        Next
                    </button>
    
                    <button type="submit" className={`button ${submitHide}`} disabled={!canSave}>
                        Submit
                    </button>
                </div>
                
            </header>
            
            <FormInput/>


        </form>
    )

    return content
}
export default Form