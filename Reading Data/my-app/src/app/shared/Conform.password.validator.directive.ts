import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
@Directive({
    selector:"[appConformPassword]",
    providers:[{
        provide:NG_VALIDATORS,
        useExisting:conformPasswordValidators,
        multi:true
    }]
})
export class conformPasswordValidators implements Validator{
    @Input() appConformPassword!:string;
    validate(control: AbstractControl<any, any>): ValidationErrors | null {
        
        let controlToCompare=control.parent?.get(this.appConformPassword);
        if(controlToCompare&&controlToCompare.value!==control.value){
            return {"notEqual":true};
        }
        else
        return null;
    }


}