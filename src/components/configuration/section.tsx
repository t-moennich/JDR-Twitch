import React from 'react';

import SectionContent from '@components/configuration/section-content';
import SectionHeader from '@components/configuration/section-header';

interface Props {
  isSubSection?: boolean;
}

export default class Section extends React.Component<Props> {
  public render(): JSX.Element {
    const children = React.Children.toArray(this.props.children);

    let sectionHeader, sectionContent;

    for (const child of children) {
      switch ((child as any).type.name) {
        case SectionHeader.name:
          sectionHeader = child;
          break;
        case SectionContent.name:
          sectionContent = child;
          break;
      }
    }

    return (
      <div className={`flex flex-col p-2 ${this.props.isSubSection === true ? '' : 'bg-gray-500'} rounded`}>
        {sectionHeader}

        <div className={'p-3'}>{sectionContent}</div>
      </div>
    );
  }
}
