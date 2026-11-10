export default function StudentAvatar({ student, className = '', style = {}, color }) {
  const bg = color || (student.program === 'YoungLife' ? '#1B4FA3' : '#3AAB35')
  if (student.photoUrl) {
    return (
      <div
        className={className}
        style={{
          ...style, overflow: 'hidden', padding: 0, background: bg,
          WebkitTouchCallout: 'none', WebkitUserSelect: 'none', userSelect: 'none',
        }}
      >
        <img
          src={student.photoUrl}
          alt={`${student.firstName} ${student.lastName}`}
          draggable={false}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            pointerEvents: 'none', WebkitTouchCallout: 'none', WebkitUserSelect: 'none', userSelect: 'none',
          }}
        />
      </div>
    )
  }
  return <div className={className} style={{ ...style, background: bg }} />
}
