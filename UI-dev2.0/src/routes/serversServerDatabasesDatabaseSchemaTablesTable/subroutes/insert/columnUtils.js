import { useState } from "react";
import { FormFieldError } from "../../../../components/atoms";


export function validationSchemaCreator(columnDefinition){

    return {};//TODO return a single object yup validation object
}

export function ColumnInput(columnDefinition,register,errors){
    //TODO false or true by default value
    const [isCurrentlyNull,setIsCurrentlyNull] = useState(false);

    return (
        <>
        <td className="text-center">
            {columnDefinition.is_nullable === "0" ? 
            (<b>not null
                <input type="hidden"
                        defaultValue="0"
                        {...register(`null-${columnDefinition.column_name}`)}/></b>) :
            (<input type="checkbox"
                    checked={isCurrentlyNull}
                    {...register(`null-${columnDefinition.column_name}`)}
                    onChange={e=>setIsCurrentlyNull(e.target.checked)}
            />)
            }
        </td>
        <td>
        <div className="input-group">
            {!isCurrentlyNull && (
                <>
                <input className="form-control" 
                    type="text" {...register(`value-${columnDefinition.column_name}`)} />
                <FormFieldError 
                    errors={errors} 
                    fieldName={columnDefinition.column_name} />
                </>
            )}
        </div>
        </td>
        </>
    );
}