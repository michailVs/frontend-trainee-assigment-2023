import {useEffect, useState} from 'react'
import { filtered, filteredByPlatform, filteredByPlatformSort, filteredBySort } from '../API/freetogame.api'
import { actions } from '../store/reducer'
import { useDispatch } from 'react-redux'
import { Dropdown, DropdownProps, Segment } from 'semantic-ui-react'
import { useAppSelector } from '../store/store'
import { platformOptions, sortOptions, tagOptions } from './filterState'

interface IData {
  value: string | string[]
}

const Filter = () => {
    const {game} = useAppSelector((state) => state.gameList);
    const [tags, setTag] = useState([])
    const [platforms, setPlatform] = useState('')
    const [sorts, setSort] = useState('')
    const dispatch = useDispatch()
  const fetchTag = (tag: any, platform?: string, sort?: string) => {
    setTag(tag)
    if (tag && !platform?.length && !sort?.length || tag && !platforms?.length && !sorts?.length) {
      filtered(tag.join('.')).then(data => {
        if (!data || !data.length) {
          return dispatch(actions.addGameList(JSON.parse(localStorage.getItem('game') || '')))
        }
        return dispatch(actions.addGameList(data))
      })
    } else if (tag && platform && !sort?.length || tag && platforms && !sorts?.length) {
      filtered(tag.join('.'), platforms).then(data => {
        if (!data || !data.length) {
          return dispatch(actions.addGameList(JSON.parse(localStorage.getItem('game') || '')))
        }
        return dispatch(actions.addGameList(data))
      })
    } else if (tag && !platform?.length && sort || tag && !platforms?.length && sorts) {
      filtered(tag.join('.'), 'all', sorts).then(data => {
        if (!data || !data.length) {
          return dispatch(actions.addGameList(JSON.parse(localStorage.getItem('game') || '')))
        }
        return dispatch(actions.addGameList(data))
      })
    } else if (tag && platform && sort || tag && platforms && sorts) {
      filtered(tag.join('.'), platforms, sorts).then(data => {
        if (!data || !data.length) {
          return dispatch(actions.addGameList(JSON.parse(localStorage.getItem('game') || '')))
        }
        return dispatch(actions.addGameList(data))
      })
    }
  }
  const fetchPlatform = (platform: any) => {
    setPlatform(platform)
    if (!tags.length && platform && !sorts?.length) {
      filteredByPlatform(platform).then(data => {
        if (!data || !data.length) {
          return dispatch(actions.addGameList(JSON.parse(localStorage.getItem('game') || '')))
        }
        return dispatch(actions.addGameList(data))
      })
    } else if (tags && platform && !sorts?.length) {
      fetchTag(tags, platform)
    } else if (tags && platform && sorts) {
      fetchTag(tags, platform, sorts)
    }
  }

  const fetchSort = (sort: any) => {
    setSort(sort)
    if (!tags.length && !platforms && sort) {
      filteredBySort(sort).then(data => {
        if (!data || !data.length) {
          return dispatch(actions.addGameList(JSON.parse(localStorage.getItem('game') || '')))
        }
        return dispatch(actions.addGameList(data))
      })
    }
    if (!tags.length && platforms && sort) {
      filteredByPlatformSort(platforms, sort).then(data => {
        if (!data || !data.length) {
          return dispatch(actions.addGameList(JSON.parse(localStorage.getItem('game') || '')))
        }
        return dispatch(actions.addGameList(data))
      })
    }
    if (tags && !platforms && sort) {
      fetchTag(tags, 'all', sort)
    }
    if (tags && platforms && sort) {
      fetchTag(tags, platforms, sort)
    }
  }
  
  return (
    <Segment>
        <Dropdown
          placeholder='Жанр'
          // fluid
          multiple
          onChange={(e, data) => fetchTag(data.value)}
          search
          selection
          options={tagOptions}
        />
        <Dropdown placeholder='Платформа' selection options={platformOptions} onChange={(e, data) => fetchPlatform(data.value)}/>
        <Dropdown placeholder='Платформа' selection options={sortOptions} onChange={(e, data) => fetchSort(data.value)}/>
    </Segment>
  )
}

export default Filter