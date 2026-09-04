const API_URL = process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:8000'

class ApiClient {
  constructor() {
    this.baseURL = API_URL
  }

  getToken() {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('admin_token')
  }

  async request(endpoint, options = {}) {
    const token = this.getToken()
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    }

    const res = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers,
    })

    if (res.status === 401) {
      localStorage.removeItem('admin_token')
      window.location.href = '/login'
      return
    }

    const data = await res.json()
    if (!res.ok) throw new Error(data.detail || 'Request failed')
    return data
  }

  get(endpoint) {
    return this.request(endpoint)
  }

  post(endpoint, body) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    })
  }

  patch(endpoint, body) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    })
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' })
  }

  // Auth
  async login(username, password) {
    const data = await this.post('/api/v1/admin/login',
      { username, password })
    localStorage.setItem('admin_token', data.access_token)
    localStorage.setItem('admin_user', JSON.stringify({
      username: data.username,
      is_superadmin: data.is_superadmin
    }))
    return data
  }

  logout() {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    window.location.href = '/login'
  }

  // Dashboard
  getDashboard() {
    return this.get('/api/v1/admin/dashboard')
  }

  // Contacts
  getContacts(params = '') {
    return this.get(`/api/v1/admin/contacts${params}`)
  }
  updateContact(id, data) {
    return this.patch(`/api/v1/admin/contacts/${id}`, data)
  }

  // EV Partners
  getEVPartners(params = '') {
    return this.get(`/api/v1/admin/ev-partners${params}`)
  }
  updateEVPartner(id, data) {
    return this.patch(`/api/v1/admin/ev-partners/${id}`, data)
  }

  // EV Stations
  getEVStations() {
    return this.get('/api/v1/admin/ev-stations')
  }
  createEVStation(data) {
    return this.post('/api/v1/admin/ev-stations', data)
  }
  updateEVStation(id, data) {
    return this.patch(`/api/v1/admin/ev-stations/${id}`, data)
  }
  deleteEVStation(id) {
    return this.delete(`/api/v1/admin/ev-stations/${id}`)
  }

  // Projects
  getProjects() {
    return this.get('/api/v1/admin/projects')
  }
  createProject(data) {
    return this.post('/api/v1/admin/projects', data)
  }
  updateProject(id, data) {
    return this.patch(`/api/v1/admin/projects/${id}`, data)
  }
  deleteProject(id) {
    return this.delete(`/api/v1/admin/projects/${id}`)
  }

  // Blog
  getBlogPosts() {
    return this.get('/api/v1/admin/blog')
  }
  createBlogPost(data) {
    return this.post('/api/v1/admin/blog', data)
  }
  updateBlogPost(id, data) {
    return this.patch(`/api/v1/admin/blog/${id}`, data)
  }
  deleteBlogPost(id) {
    return this.delete(`/api/v1/admin/blog/${id}`)
  }

  // Careers — Jobs
  getJobs() {
    return this.get('/api/v1/admin/jobs')
  }
  createJob(data) {
    return this.post('/api/v1/admin/jobs', data)
  }
  updateJob(id, data) {
    return this.patch(`/api/v1/admin/jobs/${id}`, data)
  }
  deleteJob(id) {
    return this.delete(`/api/v1/admin/jobs/${id}`)
  }

  // Careers — Applications
  getJobApplications(params = '') {
    return this.get(`/api/v1/admin/job-applications${params}`)
  }
  updateJobApplication(id, data) {
    return this.patch(`/api/v1/admin/job-applications/${id}`, data)
  }

  // Newsletter
  getNewsletterSubscribers() {
    return this.get('/api/v1/admin/newsletter')
  }
  deleteNewsletterSubscriber(id) {
    return this.delete(`/api/v1/admin/newsletter/${id}`)
  }

  // Admin users
  createAdmin(data) {
    return this.post('/api/v1/admin/create-admin', data)
  }
  getMe() {
    return this.get('/api/v1/admin/me')
  }
  changePassword(data) {
    return this.post('/api/v1/admin/change-password', data)
  }
}

export const api = new ApiClient()
