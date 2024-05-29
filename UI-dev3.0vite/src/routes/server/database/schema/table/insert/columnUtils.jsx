import { useState } from "react";
import { FormFieldError } from "../../../../../../components/atoms";

/**
 * In the table renderer loop in index JS, this function being called
 * for each field in the table schema. The code below analyses each field
 * and creates an appropriate validation for it
 * 
 * //TODO this might be more appropriate to be a utility
 *         as it can be used in update/search/insert activities
 * 
 * @param {tr} columnDefinition 
 * @returns 
 */
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
            {columnDefinition.is_primary_key === "1" && (<b>identity(1,129)</b>)}
            {!isCurrentlyNull && columnDefinition.is_primary_key !== "1" && (
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