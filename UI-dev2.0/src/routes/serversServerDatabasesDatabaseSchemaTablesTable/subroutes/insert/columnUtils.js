import { FormFieldError } from "../../../../components/atoms";


export function validationSchemaCreator(columnDefinition){

    return {};//TODO return a single object yup validation object
}

export function columnRenderer(columnDefinition,register,errors){

    return (
        <div className="input-group">
            <input className="form-control" type="text" {...register(`${columnDefinition.column_name}`)} />
            <FormFieldError errors={errors} fieldName={columnDefinition.column_name} />
        </div>
    );
}