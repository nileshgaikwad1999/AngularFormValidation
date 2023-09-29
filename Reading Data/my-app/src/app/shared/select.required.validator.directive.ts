import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
@Directive({
    selector:"[selectRequiredValidator]",
    providers:[{
        provide:NG_VALIDATORS,
        useExisting:SelectRequiredValidatorDirective,
        multi:true
    }]
})
export class SelectRequiredValidatorDirective implements Validator {
    @Input() selectRequiredValidator!:String;
    validate(control: AbstractControl<any, any>): ValidationErrors | null {
    
       return control.value===this.selectRequiredValidator?{"defaultSelected":true}:null
    }
   

}