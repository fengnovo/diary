import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

const Header = () => (
    <div>
        <Link href="/">
          <a style={linkStyle}>Home</a>
        </Link>
        <br />
        <Link href="/about">
          <a style={{ fontSize: 20 }}>About Page</a>
        </Link>
        <br />
        <Link href="/btnHref">
          <button>use Button BtnHref Page</button>
        </Link>
    </div>
)

export default Header
