var templates = {"app":"<%\n  var editMode = false;\n  if (mode === 'edit' || mode === 'blob' || mode === 'new') editMode = true;\n%>\n\n<% if (!error) { %>\n  <div class='vert clearfix navigation<% if (editMode) { %> editing<% } %>'>\n\n    <% if (!noMenu && window.authenticated) { %>\n      <ul class='mobile-menu nav clearfix'>\n        <li>\n          <a href='#' class='toggle ico menu round'></a>\n        </li>\n      </ul>\n    <% } %>\n    <% if (repo && window.authenticated) { %>\n      <ul class='project nav clearfix'>\n        <li>\n          <a href='#<%= user %>/<%= repo %>/new/<%= branch %><%= path ? \"/\"+path : \"\"%>' class='ico round new new-file'>\n            <span class='popup round arrow-right'>New File</span>\n          </a>\n        </li>\n      </ul>\n    <% } %>\n\n    <% if (editMode) { %>\n    <ul class='post-views nav clearfix'>\n      <li>\n        <a href='#' class='ico round pencil edit' data-state='edit'>\n          <span class='popup round arrow-right'>Edit</span>\n        </a>\n      </li>\n      <% if (markdown || mode === 'new') { %>\n        <li>\n          <a href='#' class='ico round eye preview' data-state='preview'<% if (jekyll) { %>data-jekyll=true<% } %>>\n            <span class='popup round arrow-right'>Preview</span>\n          </a>\n        </li>\n      <% } %>\n\n      <% if (window.authenticated) { %>\n        <% if (jekyll && lang !== 'yaml') { %>\n        <li>\n          <a href='#' class='ico round metadata meta' data-state='meta'>\n            <span class='popup round arrow-right'>Meta Data</span>\n          </a>\n        </li>\n        <% } %>\n      <li>\n        <a href='#' class='ico round sprocket settings' data-state='settings' data-drawer=true>\n          <span class='popup round arrow-right'>Post Settings</span>\n        </a>\n      </li>\n      <li>\n        <a href='#' class='ico round save quick-save'>\n          <span class='popup round arrow-right'>Save</span>\n        </a>\n      </li>\n      <% } %>\n    </ul>\n    <% } %>\n\n    <ul class='auth nav clearfix'>\n      <% if (!window.authenticated) { %>\n      <li>\n      <a class='ico round switch login' href='<%= auth.site %>/login/oauth/authorize?client_id=<%= auth.id %>&scope=repo&redirect_uri=<%= encodeURIComponent(window.location.href) %>'>\n          <span class='popup round arrow-right'>Authorize with GitHub</span>\n        </a>\n      </li>\n      <% } %>\n    </ul>\n  </div>\n<% } %>\n\n<% if (!error) { %>\n  <div id='drawer' class='sidebar'></div>\n<% } %>\n\n<div class='limiter'>\n  <div id='heading' class='heading clearfix'></div>\n</div>\n<div class='limiter'>\n  <div id='content' class='application content'></div>\n</div>\n\n<div class='prose-menu dropdown-menu'>\n  <div class='inner clearfix'>\n    <a href='#' class='icon branding dropdown-hover' data-link=true>Prose</a>\n    <ul class='dropdown clearfix'>\n      <li><a href='#'>Prose v1</a></li>\n      <li><a class='about' href='./#about'>About</a></li>\n      <li><a class='help' href='https://github.com/prose/prose'>Developers</a></li>\n      <% if (window.authenticated) { %>\n        <li class='divider'></li>\n        <li><a href='#' class='logout'>Logout</a></li>\n      <% } %>\n    </ul>\n  </div>\n</div>\n","asset":"<% if (type === 'tree') { %>\n  <li class='directory'>\n    <span class='mask'></span>\n    <a class='clearfix item' href='<%= path %>'>\n      <span class='ico fl small inline folder'></span>\n      <%= name %>\n    </a>\n  </li>\n<% } else { %>\n  <li class='asset'>\n    <span class='mask'></span>\n    <a class='clearfix item' href='<%= path %>' title='<%= path %>'>\n      <% if (_.isMedia(path)) { %>\n        <span class='ico fl small inline media'></span>\n      <% } else { %>\n        <span class='ico fl small inline document'></span>\n      <% } %>\n      <%= name %>\n    </a>\n  </li>\n<% } %>\n","button":"<div class='form-item'>\n  <label for='<%= name %>'><%= label %></label>\n  <button class='round <%= name %>' type='button' name='<%= name %>' value='<%= value %>' data-on='<%= on %>' data-off='<%= off %>'>\n    <% print(value ? on : off); %>\n  </button>\n</div>\n","checkbox":"<div class='form-item'>\n  <input type='checkbox' name='<%= name %>' value='<%= value %>'<% print(checked ? 'checked' : '') %> />\n  <label class='aside' for='<%= name %>'><%= label %></label>\n</div>\n","directories":"<li class='directory'>\n  <a\n    class='clearfix item'\n    data-index='<%= index %>'\n    data-navigate='#<%= user %>/<%= repo %>/tree/<%= branch %><%= path %>'\n    href='#<%= user %>/<%= repo %>/tree/<%= branch %><%= path %>'>\n\n    <span class='icon listing-icon round folder'></span>\n    <span class='details'>\n      <h3 class='title'><%= name %></h3>\n    </span>\n  </a>\n</li>\n","files":"<li class='clearfix item'\n    <% if (!isBinary) { %>data-navigate='#<%= user %>/<%= repo %>/edit/<%= branch %>/<%= path %>'<% } %>\n    data-index='<%= index %>'>\n\n  <% if (isBinary) { %>\n    <div class='listing-icon icon round <%= extension %> <% if (isMedia) { %>media<% } %>'></div>\n  <% } else { %>\n    <a href='#<%= user %>/<%= repo %>/edit/<%= branch %>/<%= path %>' class='listing-icon'>\n      <span class='icon round <%= extension %> <% if (isMedia) { %>media<% } %>'></span>\n    </a>\n  <% } %>\n\n  <div class='details'>\n    <div class='actions fr clearfix'>\n      <% if (!isBinary) { %>\n        <a class='clearfix'\n          title='Edit this File'\n          href='#<%= user %>/<%= repo %>/edit/<%= branch %>/<%= path %>'>\n          Edit\n        </a>\n      <% } %>\n      <% if (window.authenticated && writePermissions) { %>\n        <a\n          class='delete'\n          title='Delete this File'\n          data-user='<%= user %>'\n          data-repo='<%= repo %>'\n          data-branch='<%= branch %>'\n          data-file='<%= file %>'\n          href='#'>\n          <span class='ico rubbish small'></span>\n        </a>\n      <% } %>\n    </div>\n    <% if (isBinary) { %>\n      <h3 class='title' title='<%= name %>'><%= name %></h3>\n    <% } else { %>\n        <% if (extension === 'md') { %>\n          <a class='clearfix' href='#<%= user %>/<%= repo %>/edit/<%= branch %>/<%= path %>'>\n            <h3><%= filename %></h3>\n            <span class='deemphasize'><%= name %></span>\n          </a>\n        <% } else { %>\n          <h3 class='title' title='<%= name %>'><a class='clearfix'href='#<%= user %>/<%= repo %>/edit/<%= branch %>/<%= path %>'><%= name %></a></h3>\n        <% } %>\n      </a>\n    <% } %>\n  </div>\n</li>\n","heading":"<% if (alterable) { %>\n  <div class='action round avatar'>\n    <div class='popup-hover'>\n      <span class='ico round status'></span>\n      <% if (writable) { %>\n        <span class='popup round arrow-left'>No Changes</span>\n      <% } else { %>\n        <span class='popup round arrow-left'>Changes to Submit</span>\n      <% } %>\n      <%= avatar %>\n    </div>\n  </div>\n  <div class='fl details'>\n    <h4 class='parent-trail'><%= parentTrail %><% if (isPrivate) { %><span class='ico small inline private' title='Private Project'></span><% } %></h4>\n\n    <% if (app.state.mode === 'new' && !translate) { %>\n      <input type='text' class='filepath' placeholder='<%= title %>'>\n    <% } else { %>\n      <input type='text' class='filepath' value='<%= title %>'>\n    <% } %>\n\n    <div class='mask'></div>\n  </div>\n\n<% } else { %>\n  <div class='avatar round'><%= avatar %></div>\n  <div class='fl details'>\n    <h4><a class='user' href='#<%= parentUrl %>'><%= parent %></a></h4>\n    <h2><a class='repo' href='#<%= titleUrl %>'><%= title %></a></h2>\n  </div>\n<% } %>\n","helpDialog":"<div class='col col25'>\n  <ul class='main-menu'>\n    <% _(help).each(function(mainMenu, i) { %>\n      <li><a href='#' class='<% if (i === 0) { %>active <% } %>' data-id='<%= _.formattedClass(mainMenu.menuName) %>'><%= mainMenu.menuName %></a></li>\n    <% }); %>\n  </ul>\n</div>\n\n<div class='col col25'>\n  <% _(help).each(function(mainMenu, index) { %>\n  <ul class='sub-menu <%= _.formattedClass(mainMenu.menuName) %> <% if (index === 0) { %>active<% } %>' data-id='<%= _.formattedClass(mainMenu.menuName) %>'>\n      <% _(mainMenu.content).each(function(subMenu, i) { %>\n        <li><a href='#' data-id='<%= _.formattedClass(subMenu.menuName) %>' class='<% if (index === 0 && i === 0) { %> active<% } %>'><%= subMenu.menuName %></a></li>\n      <% }); %>\n    </ul>\n  <% }); %>\n</div>\n\n<div class='col col-last prose small'>\n  <% _(help).each(function(mainMenu, index) { %>\n    <% _(mainMenu.content).each(function(d, i) { %>\n    <div class='help-content inner help-<%= _.formattedClass(d.menuName) %><% if (index === 0 && i === 0) { %> active<% } %>'>\n      <%= d.data %>\n    </div>\n    <% }); %>\n  <% }); %>\n</div>\n","hidden":"<input type='hidden' name='<%= name %>' value='<%= value %>' />\n","linkDialog":"<div class='inner'>\n  <label>Insert Link</label>\n  <input type='text' name='href' placeholder='Link URL' />\n  <input type='text' name='text' placeholder='Link Name' />\n  <input type='text' name='title' placeholder='Title (optional)' />\n\n  <% if (relativeLinks) { %>\n    <div class='collapsible'>\n      <select data-placeholder='Insert a local link' class='chzn-select'>\n        <option value></option>\n        <% _(relativeLinks).each(function(link) { %>\n        <option value='<%= link.href %>,<%= link.text %>'><%= link.text %></option>\n        <% }); %>\n      </select>\n    </div>\n  <% } %>\n\n  <a href='#' class='button round insert' data-type='link'>Insert Link</a>\n</div>\n","loading":"<div class='loading round clearfix'>\n  <div class='loading-icon'></div>\n  <small><%= message %></small>\n</div>\n","mediaDialog":"<div class='inner clearfix'>\n\n  <div <% if (assetsDirectory) { %>class='col fl'<% } %>>\n    <label>Insert Image</label>\n\n    <% if (writable) { %>\n      <div class='contain clearfix'>\n        <span class='ico picture-add fl'></span>\n        Upload images by dragging &amp; dropping, or<br />\n        <input id='upload' class='upload' type='file' />\n        <a>selecting one</a>\n      </div>\n    <% } %>\n\n    <input type='text' name='url' placeholder='Image URL' />\n    <input type='text' name='alt' placeholder='Alt text (optional)' />\n    <a href='#' class='button round insert' data-type='media'>Insert</a>\n  </div>\n\n  <% if (assetsDirectory) { %>\n    <div class='col col-last fl media-listing'>\n      <label>Choose Existing</label>\n      <ul id='media'></ul>\n    </div>\n  <% } %>\n</div>\n","multiselect":"<div class='form-item'>\n  <label for='<%= name %>'><%= label %></label>\n  <select name='<%= name %>' data-placeholder='<%= placeholder %>' multiple class='chzn-select'>\n    <% _(options).each(function(o) { %>\n      <% if (!o.lang || o.lang === lang) { %>\n        <% if (o.name) { %>\n         <option value='<%= o.value %>'><%= o.name %></option>\n        <% } else if (o.value) { %>\n         <option value='<%= o.value %>'><%= o.value %></option>\n        <% } else { %>\n         <option value='<%= o %>' selected='selected'><%= o %></option>\n        <% } %>\n      <% } %>\n    <% }); %>\n  </select>\n</div>\n","notification":"<% if (!window.authenticated) { %>\n  <div class='notify <%= type %>'>\n    <h2 class='icon landing error'>Prose</h2>\n    <div class='inner'>\n      <p>Please login with your GitHub account to access that project.</p>\n      <p><a class='button round' href='<%= auth.site %>/login/oauth/authorize?client_id=<%= auth.id %>&scope=repo, user&redirect_uri=<%= encodeURIComponent(window.location.href) %>'>Authorize with GitHub</a></a>\n    </div>\n  </div>\n<% } else { %>\n  <div class='notify <%= key %>'>\n    <h2 class='icon landing error'>Prose</h2>\n    <div class='inner'>\n      <p><%= message %></p>\n      <% if (pathFromFile) { %>\n        <p><a class='button round create' href='#'>Create it</a></p>\n      <% } %>\n\n      <% if (key === 'error') { %>\n        <p><a class='button round' href='#'>Back to Main Page</a></p>\n      <% } else { %>\n        <p><a class='button round' href='<%= previous %>'>Go back</a></p>\n      <% } %>\n    </div>\n  </div>\n<% } %>\n","post":"<div class='editor views<% if (markdown) { %> markdown<% } %>'>\n  <div id='diff' class='view prose diff'></div>\n  <% if (jekyll) { %>\n    <div id='meta' class='view round meta'>\n      <div class='form'></div>\n      <a href='#' class='button round finish'>\n        Back to <% if (app.state.mode === 'new') { %>New Post<% } else { %><%= app.state.mode %><% } %>\n      </a>\n    </div>\n  <% } %>\n  <div id='edit' class='view active edit'>\n    <div class='topbar-wrapper'>\n      <div class='topbar'>\n        <div class='containment toolbar round'>\n          <% if (jekyll && metadata.published) { %>\n            <a href='#' class='publish-flag published round' data-state='true'>Published<span class='ico checkmark'></span></a>\n          <% } else if (jekyll && !metadata.published) { %>\n            <a href='#' class='publish-flag' data-state='false'>Unpublished<span class='ico checkmark'></span></a>\n          <% } %>\n          <div class='options clearfix'>\n            <span href='#' class='action round fl'>\n              <span class='ico status'></span>\n\n              <% if (writable) { %>\n                <span class='popup round arrow-top'>Ctrl&nbsp;+&nbsp;S</span>\n              <% } else { %>\n                <span class='popup round arrow-top'>Submit Change</span>\n              <% } %>\n\n              <%= avatar %>\n            </span>\n            <% if (markdown) { %>\n              <ul class='group round clearfix'>\n                <li><a href='#' title='Heading' data-key='heading' data-snippet='<% print(\"# Heading\\n\\n\") %>'>h1</a></li>\n                <li><a href='#' title='Sub Heading' data-key='sub-heading' data-snippet='<% print(\"## Sub Heading\\n\\n\") %>'>h2</a></li>\n              </ul>\n              <ul class='group round clearfix'>\n                <li>\n                  <a title='Insert Link' href='#' data-key='link' data-snippet=false data-dialog=true>\n                    <span class='ico small link'></span>\n                  </a>\n                </li>\n                <li>\n                  <a title='Insert Image' href='#' data-key='media' data-snippet=false data-dialog=true>\n                    <span class='ico small picture'></span>\n                  </a>\n                </li>\n              </ul>\n              <ul class='group round clearfix'>\n                <li><a href='#' title='Bold' data-key='bold' data-snippet='****'>B</a></li>\n                <li>\n                  <a data-key='italic' href='#' title='Italic' data-snippet='__'>\n                    <span class='ico small italic'></span>\n                  </a>\n                </li>\n              </ul>\n              <ul class='group round clearfix'>\n                <li>\n                  <a title='Blockquote' href='#' data-key='quote' data-snippet='<% print(\"> We loved with a love that was more than love\\n\\n\"); %>'>\n                    <span class='ico small quote'></span>\n                  </a>\n                </li>\n                <li>\n                  <a href='#' title='List' data-key='list' data-snippet='<% print(\"- item\\n- item\\n- item\\n\\n\"); %>'>\n                    <span class='ico small list'></span>\n                  </a>\n                </li>\n                <li>\n                  <a href='#' title='Numbered List' data-key='numbered-list' data-snippet='<% print(\"1. item\\n2. item\\n3. item\\n\\n\"); %>'>\n                    <span class='ico small numbered-list'></span>\n                  </a>\n                </li>\n              </ul>\n              <ul class='group round clearfix'>\n                <li>\n                  <a class='round' href='#' data-key='help' data-snippet=false data-dialog=true>\n                    <span class='ico small question'></span>\n                  </a>\n                </li>\n              </ul>\n            <% } %>\n          </div>\n          <div id='dialog'></div>\n        </div>\n      </div>\n    </div>\n    <div id='code' class='code round inner'></div>\n  </div>\n  <% if (markdown) { %>\n    <div id='preview' class='view preview prose'><%- preview %></div>\n  <% } %>\n</div>\n","posts":"<div class='topbar-wrapper'>\n  <div class='topbar'>\n    <div class='containment content-search'>\n      <span class='ico search inline fr'></span>\n      <input type='text' id='filter' placeholder='Filter Files' />\n    </div>\n  </div>\n</div>\n\n<div class='listings'>\n  <% if (path.length && path !== jailed) { %>\n    <div class='breadcrumb'>\n      <a class='branch' href='#<%= [user, repo, \"tree\", branch].join(\"/\") %>'>..</a>\n      <% _.each(_.chunkedPath(path), function(p) { %>\n        <% if (p.name !== jailed) { %>\n          <span class='slash'>/</span>\n          <a class='path' href='#<%= [user, repo, \"tree\", branch, p.url].join(\"/\") %>'><%= p.name %></a>\n        <% } %>\n      <% }); %>\n    </div>\n  <% } %>\n\n  <ul id='files' class='listing'></ul>\n</div>\n","profile":"<div class='topbar-wrapper'>\n  <div class='topbar'>\n    <div class='containment content-search'>\n      <span class='ico search inline fr'></span>\n      <input type='text' id='filter' placeholder='Filter projects' />\n    </div>\n  </div>\n</div>\n\n<div class='listings'>\n  <ul id='projects' class='projects listing'></ul>\n</div>\n","projects":"<li class='item clearfix'\n    data-navigate='#<%= owner.login %>/<%= name %>'\n    data-index='<%= index %>'>\n\n    <a\n      class='listing-icon'\n      data-user='<%= owner.login %>'\n      data-repo='<%= name %>'\n      href='#<%= owner.login %>/<%= name %>'>\n      <% if (app.state.user === app.username && (owner.login !== app.username && private)) { %>\n        <span class='icon round repo owner private' title='Shared from the account (<%= owner.login %>)'></span>\n      <% } else if (app.state.user === app.username && owner.login !== app.username) { %>\n        <span class='icon round repo owner' title='Shared from the account (<%= owner.login %>)'></span>\n      <% } else if (fork && private) { %>\n        <span class='icon round repo private fork' title='Forked from another project'></span>\n      <% } else if (fork) { %>\n        <span class='icon round repo fork' title='Forked from another project'></span>\n      <% } else if (private) { %>\n        <span class='icon round repo private'></span>\n      <% } else { %>\n        <span class='icon round repo'></span>\n      <% } %>\n    </a>\n\n    <div class='details'>\n      <div class='actions fr clearfix'>\n        <a\n          data-user='<%= owner.login %>'\n          data-repo='<%= name %>'\n          href='#<%= owner.login %>/<%= name %>'>\n          View Project\n        </a>\n        <% if (homepage) { %>\n          <a href='<%= homepage %>'>View Site</a>\n        <% } %>\n      </div>\n      <a\n        data-user='<%= owner.login %>'\n        data-repo='<%= name %>'\n        href='#<%= owner.login %>/<%= name %>'>\n        <h3<% if (!description) { %> class='title'<% } %>><%= name %></h3>\n        <span class='deemphasize'><%= description %></span>\n      </a>\n    </div>\n</li>\n","select":"<div class='form-item'>\n  <label for='<%= name %>'><%= label %></label>\n  <select name='<%= name %>' data-placeholder='<%= placeholder %>' class='chzn-select'>\n    <% _(options).each(function(o) { %>\n      <% if (!o.lang || o.lang === lang) { %>\n        <% if (o.name) { %>\n         <option value='<%= o.value %>'><%= o.name %></option>\n        <% } else { %>\n         <option value='<%= o.value %>'><%= o.value %></option>\n        <% } %>\n      <% } %>\n    <% }); %>\n  </select>\n</div>\n","settings":"<% if (window.authenticated) { %>\n  <div class='inner'>\n    <h2 class='label'>Post Options</h2>\n  </div>\n  <div class='inner authoring'>\n    <% if (app.state.config && app.state.config.languages && lang !== 'yaml') { %>\n      <% _(app.state.config.languages).each(function(lang) { %>\n        <% if (lang.value && (metadata && metadata.lang !== lang.value)) { %>\n          <a class='translate round button' href='#<%= lang.value %>'>Translate to <%= lang.name %></a>\n        <% } %>\n      <% }); %>\n    <% } %>\n\n    <% if (app.state.mode !== 'new' && writable) { %>\n      <a class='delete button round' href='#'>Delete this File</a>\n    <% } %>\n  </div>\n<% } %>\n","sidebarOrganizations":"<% if (window.authenticated) { %>\n  <div class='inner'>\n    <h2 class='label'>Groups</h2>\n  </div>\n  <ul class='listing'>\n  <% if (organizations && organizations.length) { %>\n    <li>\n      <a href='#<%= app.username %>' title='<%= app.username %>'<% if (app.state.user === app.username) { %> class='active'<% } %>>\n        <span class='ico repos inline small'></span>\n        <%= app.username %>\n      </a>\n    </li>\n    <% _.each(organizations, function(org) { %>\n    <li>\n    <a href='#<%= org.login %>' title='<%= org.login %>'<% if (app.state.user === org.login) { %> class='active'<% } %>'>\n        <span class='ico repos inline small'></span>\n        <%= org.login %>\n      </a>\n    </li>\n    <% }); %>\n  <% } %>\n  </ul>\n<% } %>\n","sidebarProject":"<div class='inner'>\n  <% if (app.state.branches.length > 0) { %>\n    <h2 class='label'>Switch Branch</h2>\n    <select data-placeholder='Current Branch Name' class='chzn-select'>\n        <option value='#<%= [user, repo, \"tree\", branch].join(\"/\") %>' selected><%= branch %></option>\n      <% _.each(branches, function(branch) { %>\n        <option value='#<%= [user, repo, \"tree\", branch].join(\"/\") %>'><%= branch %></option>\n      <% }); %>\n    </select>\n  <% } %>\n</div>\n<% if (window.authenticated) { %>\n<% if (history &&\n        history.user === user &&\n        history.repo === repo &&\n        history.branch === branch &&\n        history.recent &&\n        history.recent[app.username]) { %>\n    <div class='history'>\n      <div class='inner'>\n        <h2 class='label inner'>Most Recent History</h2>\n      </div>\n      <ul id='recent' class='listing'>\n        <%\n          var recent = history.recent[app.username];\n          var rooturl = (app.state.config && app.state.config.prose) ? app.state.config.prose.rooturl : undefined; \n          if (rooturl) {\n            recent = recent.filter(function(item) {\n              return item.indexOf(rooturl) > -1;\n            });\n          }\n        %>\n        <% _.each(recent.slice(0,5), function(filename) { \n            var status = history.commits[filename][0].status;\n        %>\n        <li><a class='item <%= status %>' title='<%= status %>: <%= filename %>' href='#<%= [user, repo, \"edit\", branch, filename].join(\"/\") %>' data-path='<%= filename %>'>\n            <span class='ico small inline <%= status %>'></span>\n            <% if (status === 'removed') { %>\n              <span class='overlay'>\n                <span class='ico small inline <%= status %>'></span>\n                Restore?\n              </span>\n            <% } %>\n            <%= filename %>\n          </a></li>\n        <% }); %>\n      </ul>\n    </div>\n  <% } %>\n<% } %>\n\n<% if (repo && window.authenticated) { %>\n<div class='inner'>\n  <a href='#<%= user %>/<%= repo %>/new/<%= branch %><%= path ? \"/\"+path : \"\"%>' class='round button mobile-new-file'>Create a New File</a>\n</div>\n<% } %>\n","sidebarSave":"<% if (window.authenticated) { %>\n  <div class='inner'>\n    <h2 class='label'>Describe your Changes</h2>\n  </div>\n  <div class='inner authoring'>\n    <div class='commit'>\n      <textarea class='commit-message' placeholder></textarea>\n    </div>\n\n    <% if (writable) { %>\n      <a class='confirm button round' href='#'>Commit</a>\n    <% } else { %>\n      <a class='confirm button round' href='#'>Submit Change Request</a>\n    <% } %>\n\n  </div>\n<% } %>\n","start":"<% if (!window.authenticated) { %>\n  <div class='round splash'>\n    <h2 class='icon landing'>Prose</h2>\n    <div class='inner'>\n      <p>Prose is a content editor for GitHub designed for managing websites.</p>\n      <p><a href='#about'>Learn more</a></p>\n      <a class='round button' href='<%= auth.site %>/login/oauth/authorize?client_id=<%= auth.id %>&scope=repo'>Authorize with GitHub</a>\n    </div>\n  </div>\n<% } %>\n","text":"<div class='form-item'>\n  <label for='<%= name %>'><%= label %></label>\n  <input type='text' name='<%= name %>' value='<%= value %>' data-type='<%= type %>' />\n</div>\n","upgrade":"<div class='start'>\n  <div class='round splash'>\n    <h2 class='icon landing'>Prose</h2>\n    <div class='inner'>\n      <p>Prose requires features not available to your browser</p>\n      <a class='round button' href='https://www.google.com/intl/en/chrome/browser'>Download a Modern Browser</a>\n    </div>\n  </div>\n</div>\n"}; module.exports = templates;