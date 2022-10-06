import { createContext, useState, useEffect } from "react"

const FormContext = createContext({})



export const FormProvider = ({ children }) => {
  
  //? this is a lookup object representing the page
  const title = {
    0:"Billing info",
    1:"Shipping info",
    2:"Opt-In"
  }
  const [page,setPage] = useState(0)
  
  const [data, setData] = useState({
    billFirstName: "",
    billLastName: "",
    billAddress1: "",
    billAddress2: "",
    billCity: "",
    billState: "",
    billZipCode: "",
    sameAsBilling: false,
    shipFirstName: "",
    shipLastName: "",
    shipAddress1: "",
    shipAddress2: "",
    shipCity: "",
    shipState: "",
    shipZipCode: "",
    optInNews: false
  })

  const handleChange = e => {
    const type = e.target.type

    const name = e.target.name

    const value = type === "checkbox"
        ? e.target.checked
        : e.target.value

    setData(prevData => ({
        ...prevData,
        [name]: value
    }))
  }
  
  //! useEffect to check to see if teh same as billing changed if it changed to true we set the shipping data same as the billing data if its false we set all the shipping data back to empty
  useEffect(() => {
    if (data.sameAsBilling) {
        setData(prevData => ({
            ...prevData,
            shipFirstName: prevData.billFirstName,
            shipLastName: prevData.billLastName,
            shipAddress1: prevData.billAddress1,
            shipAddress2: prevData.billAddress2,
            shipCity: prevData.billCity,
            shipState: prevData.billState,
            shipZipCode: prevData.billZipCode
        }))
    } else {
        setData(prevData => ({
            ...prevData,
            shipFirstName: "",
            shipLastName: "",
            shipAddress1: "",
            shipAddress2: "",
            shipCity: "",
            shipState: "",
            shipZipCode: ""
        }))
    }
}, [data.sameAsBilling])


  //! we remove the not required data leaving only the required to check if they are true
  const { billAddress2,sameAsBilling,shipAddress2,optInNews,...requiredInputs } = data
    
  //! all required and last page
  const canSave = [...Object.values(requiredInputs)].every(Boolean) && page === Object.keys(title).length - 1


  const handlePrev = () => { 
    setPage((prev)=>prev-1)
  }
  const handleNext = () => { 
    setPage((prev)=>prev+1)
  }
  
  const disablePrev = page === 0
  
  const prevHide = page === 0 && "remove-button"

  const nextHide = page === Object.keys(title).length - 1 && "remove-button"

  const submitHide = page !== Object.keys(title).length - 1 && "remove-button"
  
    return (
    <FormContext.Provider value={{data, setData,title,page,setPage,canSave,handleChange,handlePrev,handleNext,prevHide,nextHide,submitHide,disablePrev}}>
        {children}
    </FormContext.Provider>
  )
}

export default FormContext