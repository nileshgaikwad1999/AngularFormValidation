import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators{
    
 static emailDomainParamter(domainemail:string):{[key:string]:any}|null{
    return (controls:AbstractControl):{[key:string]:any}|null=>{
      let email:string=controls.value;
      const domain=email.substring(email.lastIndexOf('@')+1);
      if( email===''||domain.toLocaleLowerCase()===domainemail){
      return null;
      }
      else{
      return {"Emaildomain":true}
      }
    }
    
    
    }

    static emailMismatch(control: AbstractControl): ValidationErrors | null{

        let email=control.get('email');
        let emailConform=control.get('conformEmail')
        if(email?.value===emailConform?.value ||(emailConform?.pristine&&emailConform?.value===''))
        {
            return null;
        }
        else{
          return  ({"Mismatch":true})
        }
    }   
  
}