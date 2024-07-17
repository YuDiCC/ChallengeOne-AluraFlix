import { createContext, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import VideoData from '../data/VideoData'
import CategoryData from '../data/CategoryData'
import BannerData from '../data/BannerData'

const DataContext = createContext()

export const useData = () => {
  return useContext(DataContext)
}

const URL_VIDEOS_API = 'http://localhost:3000/videos'
const URL_CATEGORIES_API = 'http://localhost:3000/categorias'
const URL_BANNER_API = 'http://localhost:3000/banner'

function DataProvider({ children }) {
  const [videos, setVideos] = useState([])
  const [categories, setCategories] = useState([])
  const [banner, setBanner] = useState([])
  const [fetching, setFetching] = useState(true)

  const fetchVideos = async () => {
    try {
      const res = await fetch(URL_VIDEOS_API)
      if (!res.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await res.json()
      setVideos(data)
    } catch (error) {
      console.error(
        'Failed to fetch videos from API, loading local data:',
        error,
      )
      setVideos(VideoData)
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch(URL_CATEGORIES_API)
      if (!res.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await res.json()
      setCategories(data)
    } catch (error) {
      console.error(
        'Failed to fetch categories from API, loading local data:',
        error,
      )
      setCategories(CategoryData)
    }
  }

  const fetchBanner = async () => {
    try {
      const res = await fetch(URL_BANNER_API)
      if (!res.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await res.json()
      setBanner(data)
    } catch (error) {
      console.error(
        'Failed to fetch banner from API, loading local data:',
        error,
      )
      setBanner(BannerData)
    }
  }

  useEffect(() => {
    fetchCategories()
    fetchBanner()
  }, [])

  useEffect(() => {
    if (fetching) {
      fetchVideos()
      setFetching(false)
    }
  }, [fetching])

  const postVideo = async video => {
    try {
      const res = await fetch(URL_VIDEOS_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(video),
      })
      const data = await res.json()
      setVideos([...videos, setVideos(data)])
      setFetching(true)
    } catch (error) {
      console.error(error)
    }
  }

  const editVideo = async (id, video) => {
    try {
      const res = await fetch(`${URL_VIDEOS_API}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(video),
      })
      const data = await res.json()
      setVideos([...videos, setVideos(data)])
      setFetching(true)
    } catch (error) {
      console.error(error)
    }
  }

  const deleteVideo = async id => {
    try {
      await fetch(`${URL_VIDEOS_API}/${id}`, {
        method: 'DELETE',
      })
      setVideos(videos.filter(video => video.id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <DataContext.Provider
      value={{
        videos,
        categories,
        banner,
        postVideo,
        editVideo,
        deleteVideo,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DataProvider
