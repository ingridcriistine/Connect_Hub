// import { Request,Response } from 'express';
// import {prisma} from '../lib/prisma.ts';
// import CapDto from '../dto/capDto.ts';
// import axios from 'axios'
// import ResApiDto from '../dto/resApiDto.ts';

// export default class PokemonService{

//     static async capture(data:CapDto):Promise<{response:boolean,message:string}>{

//         console.log(data.id)
//         let pok = await prisma.pokemons.findUnique({where:{id:data.id}});

//         if(pok!==null)
//             return {response:false,message:"Pokemon ja Capturado!"}

//         let res = await axios.get<ResApiDto>(`https://pokeapi.co/api/v2/pokemon-species/${data.id}`)

//         console.log(res);

//         const capRate = res.data.capture_rate;

//         let random:number = Math.random()*100;

//         if(random>capRate%100){
//             return {response:false,message:"Falha na captura do Pokemon!"};
//         }

//         await prisma.pokemons.create({data:{id:data.id}})

//         return {response:true,message:"Pokemon  Capturado!"}

//     }

//     static async team(){
//         return await prisma.pokemons.findMany();
//     }
// }