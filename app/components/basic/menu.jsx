import React from 'react'

/**
 * Компонент меню, раскрывающегося по кнопке. Как правило помещается в карточки, навбары и т.д.
 * См. https://getmdl.io/components/index.html#menus-section
 */
export default class Menu extends React.Component {
    render() {
        let { options, domId } = this.props
        options = options.map((option, i) => <li class="mdl-menu__item" onClick={() => option.action(this.props.actionTarget)} key={i}>{option.text}</li>)
        domId = 'menu-btn' + domId
        return (
            <div>
                <button id={domId} class="mdl-button mdl-js-button mdl-button--icon">
                    <i class="material-icons">more_vert</i>
                </button>
                <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for={domId}>
                    {options}
                </ul>
            </div>
        )
    }

    componentDidMount() {
        componentHandler.upgradeDom('MaterialMenu', 'mdl-menu')
    }
}

