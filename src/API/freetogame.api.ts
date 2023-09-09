
import { IGame } from '../interface/IGame';
import axios, { Axios, AxiosError, AxiosRequestConfig } from "axios"


let request: number = 0
export const getGameById = async (id: string | undefined | number) => {
  const options: AxiosRequestConfig = {
      params: {id: id},
      headers: {
        'X-RapidAPI-Key': 'c76608a968msh94f439fe0c95069p1fe616jsncb36c5597733',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    }
  try {
    const {data} = await axios.get('https://free-to-play-games-database.p.rapidapi.com/api/game', options)
    return data
  } catch (error) {
    while (request < 3) {
      request++
      getGameById(id)
    }
    return error
  }
}

const baseUrl = 'https://free-to-play-games-database.p.rapidapi.com/api/'

export const getAllGame = async () => {
  const options = {
      headers: {
        'X-RapidAPI-Key': 'c76608a968msh94f439fe0c95069p1fe616jsncb36c5597733',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };
  try {
      const {data} = await axios.get('https://free-to-play-games-database.p.rapidapi.com/api/games', options);
      return data
  } catch (error) {
    while (request < 3) {
      request++
      getAllGame()
    }
    return error
  }
}

export const filtered = async (tag: string, platform?: string, sort?: string) => {
  const headers = {
    'X-RapidAPI-Key': 'c76608a968msh94f439fe0c95069p1fe616jsncb36c5597733',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
  }
  let options = {};
  if (!platform && tag && !sort) {
    try {
      options = {
        params: {tag: tag},
        headers: headers
      }
      const {data} = await axios.get(`${baseUrl}filter`, options)
      return data
    } catch (err) {
      while (request < 3) {
        request++
        filtered(tag)
      }
      return err
    }
  }
  if (platform && tag && !sort) {
    try {
      options = {
        params: {tag: tag, platform: platform},
        headers: headers
      }
      const {data} = await axios.get(`${baseUrl}filter`, options)
      return data
    } catch (err) {
      while (request < 3) {
        request++
        filtered(tag, platform)
      }
      return err
    }
  }
  if (platform && tag && sort) {
    try {
      options = {
        params: {tag: tag, platform: platform, 'sort-by': sort},
        headers: headers
      }
      const {data} = await axios.get(`${baseUrl}filter?tag=${tag}&platform=${platform}&sort-by=${sort}`, options)
      return data
    } catch (err) {
      while (request < 3) {
        request++
        filtered(tag, platform, sort)
      }
      return err
    }
  }
}

export const filteredByPlatformSort = async (platform: string, sort: string) => {
  const options = {
    params: {platform: platform, 'sort-by': sort},
    headers: {
      'X-RapidAPI-Key': 'c76608a968msh94f439fe0c95069p1fe616jsncb36c5597733',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  }
  try {
    const {data} = await axios.get('https://free-to-play-games-database.p.rapidapi.com/api/games', options)
    return data
  } catch (err) {
    while (request < 3) {
      request++
      filteredByPlatformSort(platform, sort)
    }
    return err
  }
}

export const filteredByPlatform = async (platform: string) => {
  const options = {
    params: {platform: platform},
    headers: {
      'X-RapidAPI-Key': 'c76608a968msh94f439fe0c95069p1fe616jsncb36c5597733',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  }
  try {
    const {data} = await axios.get('https://free-to-play-games-database.p.rapidapi.com/api/games', options)
    return data
  } catch (err) {
    while (request < 3) {
      request++
      filteredByPlatform( platform)
    }
    return err
  }
}
export const filteredBySort = async (sort: string) => {
  const options = {
    params: {'sort-by': sort},
    headers: {
      'X-RapidAPI-Key': 'c76608a968msh94f439fe0c95069p1fe616jsncb36c5597733',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  }
  try {
    const {data} = await axios.get('https://free-to-play-games-database.p.rapidapi.com/api/games', options)
    return data
  } catch (err) {
    while (request < 3) {
      request++
      filteredBySort(sort)
    }
    return err
  }
}