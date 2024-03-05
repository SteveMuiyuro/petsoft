import { PetsContext } from "@/contexts/pets-context-provider";
import { searchContext } from "@/contexts/search-context-provider";
import { useContext } from "react";

export function usePetsContext(){
   const context =  useContext(PetsContext)
   if(!context){
    throw new Error("Please usePetsContext inside the PetsContextProvider")
   }
   return context;
}


export function useSearchContext(){
   const context = useContext(searchContext)

   if(!context) {
      throw new Error("Please use useSearchContext inside the SearchContext provider")
   }

   return context;
}
