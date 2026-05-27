import { useState, useEffect } from 'react'
import { supabase } from './supabase'

const COUNTRIES = [
  { name: 'Alemanha', flag: '🇩🇪' }, { name: 'Argentina', flag: '🇦🇷' },
  { name: 'Austrália', flag: '🇦🇺' }, { name: 'Bélgica', flag: '🇧🇪' },
  { name: 'Bolivia', flag: '🇧🇴' }, { name: 'Brasil', flag: '🇧🇷' },
  { name: 'Canadá', flag: '🇨🇦' }, { name: 'Chile', flag: '🇨🇱' },
  { name: 'China', flag: '🇨🇳' }, { name: 'Colômbia', flag: '🇨🇴' },
  { name: 'Coreia do Sul', flag: '🇰🇷' }, { name: 'Costa Rica', flag: '🇨🇷' },
  { name: 'Croácia', flag: '🇭🇷' }, { name: 'Dinamarca', flag: '🇩🇰' },
  { name: 'Egito', flag: '🇪🇬' }, { name: 'Equador', flag: '🇪🇨' },
  { name: 'Escócia', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' }, { name: 'Espanha', flag: '🇪🇸' },
  { name: 'EUA', flag: '🇺🇸' }, { name: 'França', flag: '🇫🇷' },
  { name: 'Gana', flag: '🇬🇭' }, { name: 'Grécia', flag: '🇬🇷' },
  { name: 'Holanda', flag: '🇳🇱' }, { name: 'Honduras', flag: '🇭🇳' },
  { name: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' }, { name: 'Irlanda', flag: '🇮🇪' },
  { name: 'Itália', flag: '🇮🇹' }, { name: 'Jamaica', flag: '🇯🇲' },
  { name: 'Japão', flag: '🇯🇵' }, { name: 'Mali', flag: '🇲🇱' },
  { name: 'Marrocos', flag: '🇲🇦' }, { name: 'México', flag: '🇲🇽' },
  { name: 'Nigéria', flag: '🇳🇬' }, { name: 'Noruega', flag: '🇳🇴' },
  { name: 'Paraguai', flag: '🇵🇾' }, { name: 'Peru', flag: '🇵🇪' },
  { name: 'Polonia', flag: '🇵🇱' }, { name: 'Portugal', flag: '🇵🇹' },
  { name: 'Reino Unido', flag: '🇬🇧' }, { name: 'Romênia', flag: '🇷🇴' },
  { name: 'Rússia', flag: '🇷🇺' }, { name: 'Senegal', flag: '🇸🇳' },
  { name: 'Sérvia', flag: '🇷🇸' }, { name: 'Suécia', flag: '🇸🇪' },
  { name: 'Suíça', flag: '🇨🇭' }, { name: 'Turquia', flag: '🇹🇷' },
  { name: 'Ucrânia', flag: '🇺🇦' }, { name: 'Uruguai', flag: '🇺🇾' },
  { name: 'Venezuela', flag: '🇻🇪' },
]

const initialForm = { teamName: '', country: null, members: ['', '', '', '', ''] }

export default function App() {
  const [form, setForm] = useState(initialForm)
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState({})
  const [view, setView] = useState('form')
  const [search, setSearch] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => { loadTeams() }, [])

  async function loadTeams() {
    setLoading(true)
    const { data, error } = await supabase
      .from('teams').select('*').order('created_at', { ascending: true })
    if (!error) setTeams(data || [])
    setLoading(false)
  }

  function validate() {
    const e = {}
    if (!form.teamName.trim()) e.teamName = 'Informe o nome do time.'
    if (!form.country) e.country = 'Escolha uma seleção.'
    if (!form.members[0].trim()) e.member0 = 'Nome obrigatório.'
    if (!form.members[1].trim()) e.member1 = 'Nome obrigatório.'
    if (!form.members[2].trim()) e.member2 = 'Nome obrigatório.'
    if (!form.members[3].trim()) e.member3 = 'Nome obrigatório.'
    return e
  }

  async function handleSubmit() {
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }
    setSaving(true)
    const duplicate = teams.find(t => t.team_name.toLowerCase() === form.teamName.trim().toLowerCase())
    if (duplicate) { setErrors({ teamName: 'Já existe um time com esse nome.' }); setSaving(false); return }
    const { error } = await supabase.from('teams').insert({
      team_name: form.teamName.trim(),
      country: form.country.name,
      country_flag: form.country.flag,
      member_1: form.members[0].trim(),
      member_2: form.members[1].trim(),
      member_3: form.members[2].trim(),
      member_4: form.members[3].trim(),
      member_5: form.members[4].trim() || null,
    })
    if (!error) {
      await loadTeams(); setForm(initialForm); setErrors({})
      setSuccess(true); setTimeout(() => setSuccess(false), 3500)
    } else { alert('Erro ao inscrever o time. Tente novamente.') }
    setSaving(false)
  }

  function setMember(i, val) {
    const m = [...form.members]; m[i] = val; setForm({ ...form, members: m })
    if (errors[`member${i}`]) { const e = { ...errors }; delete e[`member${i}`]; setErrors(e) }
  }

  const filtered = COUNTRIES.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))

  const memberConfig = [
    { label: 'Capitão', required: true, badge: '⚽ Capitão' },
    { label: '2º Jogador', required: true },
    { label: '3º Jogador', required: true },
    { label: '4º Jogador', required: true },
    { label: 'Reserva', required: false },
  ]

  return (
    <div className="container">
      <div className="header">
        <div className="header-icon">🏆</div>
        <h1>Inscrição de Times</h1>
        <p>Quarteto — escolha sua seleção</p>
      </div>

      <div className="tabs">
        <button className={view === 'form' ? 'tab active' : 'tab'} onClick={() => setView('form')}>
          + Inscrever time
        </button>
        <button className={view === 'teams' ? 'tab active' : 'tab'} onClick={() => { setView('teams'); loadTeams() }}>
          Times inscritos {!loading && `(${teams.length})`}
        </button>
      </div>

      {view === 'form' && (
        <div className="card">
          {success && <div className="alert success">✓ Time inscrito com sucesso!</div>}

          <div className="field">
            <label>Nome do time</label>
            <input type="text" placeholder="Ex: Os Invencíveis" value={form.teamName}
              onChange={e => { setForm({ ...form, teamName: e.target.value }); if (errors.teamName) setErrors({ ...errors, teamName: undefined }) }}
              className={errors.teamName ? 'error' : ''} />
            {errors.teamName && <span className="error-msg">{errors.teamName}</span>}
          </div>

          <div className="field">
            <label>Seleção</label>
            <div className="flag-picker">
              <div className="flag-selected" onClick={() => setShowDropdown(!showDropdown)}>
                {form.country
                  ? <><span className="flag-emoji">{form.country.flag}</span><span>{form.country.name}</span></>
                  : <span className="placeholder">Escolha uma seleção...</span>}
                <span className="flag-arrow">▾</span>
              </div>
              {showDropdown && (
                <div className="flag-dropdown">
                  <input type="text" placeholder="Buscar país..." value={search}
                    onChange={e => setSearch(e.target.value)} className="flag-search" autoFocus />
                  <div className="flag-list">
                    {filtered.map(c => (
                      <div key={c.name} className="flag-option" onClick={() => {
                        setForm({ ...form, country: c })
                        setShowDropdown(false); setSearch('')
                        if (errors.country) setErrors({ ...errors, country: undefined })
                      }}>
                        <span className="flag-emoji">{c.flag}</span>
                        <span>{c.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {errors.country && <span className="error-msg">{errors.country}</span>}
          </div>

          <div className="divider"><span>Jogadores</span></div>

          {memberConfig.map(({ label, required, badge }, i) => (
            <div className={`field ${i === 4 ? 'field-reserve' : ''}`} key={i}>
              <label>
                {label}
                {badge && <span className="captain-badge">{badge}</span>}
                {!required && <span className="optional-badge">Opcional</span>}
              </label>
              <input type="text" placeholder="Nome completo" value={form.members[i]}
                onChange={e => setMember(i, e.target.value)}
                className={errors[`member${i}`] ? 'error' : ''} />
              {errors[`member${i}`] && <span className="error-msg">{errors[`member${i}`]}</span>}
            </div>
          ))}

          <button className="btn-submit" onClick={handleSubmit} disabled={saving}>
            {saving ? 'Inscrevendo...' : 'Inscrever time'}
          </button>
        </div>
      )}

      {view === 'teams' && (
        <div>
          {loading ? <p className="empty">Carregando times...</p>
          : teams.length === 0 ? (
            <div className="empty-box"><span>🏆</span><p>Nenhum time inscrito ainda.</p></div>
          ) : (
            <div className="teams-list">
              {teams.map((team, idx) => (
                <div className="team-card" key={team.id}>
                  <div className="team-header">
                    <div className="team-number">{idx + 1}</div>
                    <span className="team-flag">{team.country_flag}</span>
                    <div className="team-info">
                      <span className="team-name">{team.team_name}</span>
                      <span className="team-country">{team.country}</span>
                    </div>
                    <span className="team-date">{new Date(team.created_at).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="team-members">
                    {[
                      { name: team.member_1, captain: true },
                      { name: team.member_2 },
                      { name: team.member_3 },
                      { name: team.member_4 },
                      ...(team.member_5 ? [{ name: team.member_5, reserve: true }] : [])
                    ].map((m, mi) => (
                      <div className={`member ${m.reserve ? 'member-reserve' : ''}`} key={mi}>
                        <span className="member-dot">{m.captain ? '©' : m.reserve ? '🔄' : '•'}</span>
                        {m.name}
                        {m.captain && <span className="captain-tag">Cap.</span>}
                        {m.reserve && <span className="reserve-tag">Reserva</span>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <p className="footer-note">Inscrições abertas ao público.</p>
    </div>
  )
}
