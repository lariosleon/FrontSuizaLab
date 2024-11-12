import { useEffect,ChangeEvent, FormEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Error from './Error'
import type { DraftPatient } from '../types'
import { usePatientStore } from '../store'

import type { SearchType } from "../types";
import { _tipodedocumento } from "../data/tipodedocumento";


export default function PatientForm() {

    const [search, setSearch] = useState<SearchType>({
        tipodedocumento: ''
    })

    const addPatient  = usePatientStore(state => state.addPatient)
    const activeId = usePatientStore(state => state.activeId)
    const patients = usePatientStore(state => state.patients)
    const updatePatient = usePatientStore(state => state.updatePatient)

    const { register, handleSubmit, setValue , formState: { errors }, reset } = useForm<DraftPatient>()

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.name] : e.target.value
        })
    }

    useEffect(() => {
        if(activeId) {
            const activePatient = patients.filter( patient => patient.id === activeId)[0]
            setValue('name', activePatient.name)
            setValue('caretaker', activePatient.caretaker)
            setValue('tipodedocumento', activePatient.tipodedocumento)

        }
    }, [activeId])

    const registerPatient = (data: DraftPatient) => {
        if(activeId) {
            updatePatient(data)
            toast('Paciente Actualizado Correctamente', {
                type: 'success'
            })
        } else {
            addPatient(data)
            toast.success('Paciente Registrado Correctamente')
        }
        reset()
    }


  
    return (
      <div className="md:w-1/2 lg:w-2/5 mx-5">
          <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
  
          <p className="text-lg mt-5 text-center mb-10">
              Añade Pacientes y {''}
              <span className="text-indigo-600 font-bold">Administralos</span>
          </p>

          <form 
              className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
              noValidate
              onSubmit={handleSubmit(registerPatient)}
          >
                <div className="mb-5">
                    <label htmlFor="name" className="text-sm uppercase font-bold">
                        Nombre Completo
                    </label>
                    <input  
                        id="name"
                        className="w-full p-3  border border-gray-100"  
                        type="text" 
                        placeholder="Nombre del Paciente" 
                        {...register('name', {
                            required: 'El Nombre del paciente es obligatorio'
                        })}
                    />

                    {errors.name && (
                        <Error>{errors.name?.message}</Error>
                    )}
                    
                </div>
  
                <div className="mb-5">
                    <label htmlFor="caretaker" className="text-sm uppercase font-bold">
                        Numero de Documento 
                    </label>
                    <input  
                        id="caretaker"
                        className="w-full p-3  border border-gray-100"  
                        type="text" 
                        placeholder="Nombre del Propietario" 
                        {...register('caretaker', {
                                required: 'El Propietario es obligatorio'
                        })}
                        />

                        {errors.caretaker && (
                            <Error>{errors.caretaker?.message}</Error>
                        )}
                </div>
  
 

              <div className="mb-5">
                <label htmlFor="tipodedocumento">Tipo de Documento:</label>
                <select
                    id="tipodedocumento"
                    name="tipodedocumento"
                    value={search.tipodedocumento}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione el tipo de Documento---</option>
                    {_tipodedocumento.map( tipodedocumento => (
                        <option
                            key={tipodedocumento.code}
                            value={tipodedocumento.code}
                        >{tipodedocumento.name}</option>
                    ))}
                </select>
            </div>
  
  
              <input
                  type="submit"
                  className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                  value='Guardar Paciente'
              />
          </form> 
      </div>
    )
  }