import React from 'react';
import Link from 'gatsby-link';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import Headroom from 'react-headroom';
import Bio from '../components/Bio';
import { rhythm } from '../utils/typography';

// import 'prismjs/themes/prism-solarizedlight.css';
import 'prismjs/themes/prism-tomorrow.css';

class BlogIndex extends React.Component {
  state = { showing_header: false };

  static defaultProps = {
    header_style: {
      backgroundColor: 'hsla(247.5, 50%, 3.1%, 1.0)',
      color: 'white',
      paddingLeft: '1%',
      paddingRight: '1%',
      paddingTop: '1%',
    },
  };

  unpinned = () => this.setState({ showing_header: true });

  unfixed = () => this.setState({ showing_header: false });

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const posts = get(this, 'props.data.allMarkdownRemark.edges');
    let header_style = {};
    if (this.state.showing_header === true) header_style = this.props.header_style;

    return (
      <div>
        <Helmet title={siteTitle} />
        <Headroom onPin={this.pinned} onUnpin={this.unpinned} onUnfix={this.unfixed}>
          <Bio style={header_style} />
        </Headroom>
        {posts.map(({ node }) => {
          const title = get(node, 'frontmatter.title') || node.fields.slug;
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}>
                <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
          }
        }
      }
    }
  }
`;
