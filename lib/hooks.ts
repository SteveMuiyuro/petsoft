import { PetsContext } from "@/contexts/pets-context-provider";
import { useContext } from "react";

export function usePetsContext(){
   const context =  useContext(PetsContext)
   if(!context){
    throw new Error("Please usePetsContext inside the PetsContextProvider")
   }
   return context;
}
