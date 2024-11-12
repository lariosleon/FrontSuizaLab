export type Patient = {
    id: string
    name: string
    caretaker: string
    tipodedocumento: string

}

export type DraftPatient = Omit<Patient, 'id'>

export type tipodedocumento = {
    code: string
    name: string
}


export type SearchType = {
    tipodedocumento: string
}