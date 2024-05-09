import json
import asyncio
import requests

async def getPokemonTypes(pokemonDetails):
    return [type_data['type']['name'] for type_data in pokemonDetails]

async def getTypeNameInFrench(typeName):
    try:
        response = requests.get(f"https://pokeapi.co/api/v2/type/{typeName}")
        return response.json()['names'][0]['name']
    except Exception as e:
        print(f"Erreur lors de la récupération du nom français du type {typeName}: {e}")
        return 'Inconnu'

async def getPokemonDetails(pokemonEnglishName):
    try:
        response = requests.get(f"https://pokeapi.co/api/v2/pokemon/{pokemonEnglishName.lower()}")
        return response.json()
    except Exception as e:
        print(f"Erreur lors de la récupération des détails du Pokémon {pokemonEnglishName}: {e}")
        return None

def french(types):
    if types.lower() == 'flying':
        return 'vol'
    elif types.lower() == 'fire':
        return 'feu'
    elif types.lower() == 'normal':
        return 'normal'
    elif types.lower() == 'electric':
        return 'électrik'
    elif types.lower() == 'grass':
        return 'plante'
    elif types.lower() == 'ice':
        return 'glace'
    elif types.lower() == 'fighting':
        return 'combat'
    elif types.lower() == 'poison':
        return 'poison'
    elif types.lower() == 'ground':
        return 'sol'
    elif types.lower() == 'psychic':
        return 'psy'
    elif types.lower() == 'bug':
        return 'insecte'
    elif types.lower() == 'rock':
        return 'roche'
    elif types.lower() == 'ghost':
        return 'spectre'
    elif types.lower() == 'dragon':
        return 'dragon'
    elif types.lower() == 'dark':
        return 'ténèbres'
    elif types.lower() == 'steel':
        return 'acier'
    elif types.lower() == 'fairy':
        return 'fée'
    elif types.lower() == 'water':
        return 'eau'
    
async def createPokemonDictionary():
    pokemon_dictionary = {}

    with open('/home/ilyes/Bureau/Projet-Aws/acceuil/src/Composants/assets/datas/pokemon_names.json', 'r') as f:
        pokemon_names = json.load(f)

    for french_name, english_name in pokemon_names.items():
        pokemon_details = await getPokemonDetails(english_name)
        if pokemon_details:
            pokemon_types = await getPokemonTypes(pokemon_details['types'])
            first_type = french(pokemon_types[0])
            second_type = french(pokemon_types[1]) if len(pokemon_types) > 1 else 'aucun'
            spritelink = pokemon_details['sprites']['front_default']
            pokemon_dictionary[french_name] = (first_type, second_type, spritelink)
            print("Le pokémon %s est dans le json" %french_name, first_type, second_type, spritelink)

    return pokemon_dictionary



def main():
    pokemon_dictionary = asyncio.run(createPokemonDictionary())
    with open('pokemon_dictionary.json', 'w') as json_file:
        json.dump(pokemon_dictionary, json_file, indent=4)

if __name__ == "__main__":
    main()
