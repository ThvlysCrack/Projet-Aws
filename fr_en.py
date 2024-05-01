import requests
import json

def fetch_pokemon_names():
    url = 'https://pokeapi.co/api/v2/pokemon?limit=1025'  # 898 est le nombre total de Pokémon répertoriés
    response = requests.get(url)

    if response.status_code == 200:
        pokemon_data = response.json()
        pokemon_list = pokemon_data['results']
        pokemon_names = {}
        index = 0
        for pokemon in pokemon_list:
            name = pokemon['name']
            pokemon_url = pokemon['url']
            pokemon_info = requests.get(pokemon_url).json()
            # Récupération du nom français à partir de l'API 'pokemon-species'
            french_name = get_french_name(pokemon_info)
            if french_name:
                pokemon_names[french_name] = name
                index +=1
                print("Le pokémon %d est dans le json." %index)
        return pokemon_names
    else:
        print(f"Erreur lors de la récupération des données (code : {response.status_code})")
        return None

def get_french_name(pokemon_info):
    species_url = pokemon_info['species']['url']
    species_info = requests.get(species_url).json()

    for name in species_info['names']:
        if name['language']['name'] == 'fr':
            return name['name']

    return None

def save_to_json(pokemon_names):
    with open('pokemon_names.json', 'w') as file:
        json.dump(pokemon_names, file, indent=4, ensure_ascii=False)
        print("Données enregistrées avec succès dans pokemon_names.json")

if __name__ == "__main__":
    pokemon_names = fetch_pokemon_names()
    if pokemon_names:
        save_to_json(pokemon_names)
