import React, { ChangeEvent } from 'react';
import lodash from 'lodash';

import { IUpdateChatIntegrationConfiguration, IUpdateStreamerConfiguration } from '@models/streamer-configuration';

import ToggleButton from '@components/form/toggle';
import Section from '@components/configuration/section';
import SectionHeader from '@components/configuration/section-header';
import SectionHeaderAnnoatation from '@components/configuration/section-header-annotation';
import SectionContent from '@components/configuration/section-content';
import ConfigurationContent from '@components/configuration/configuration-content';
import Accordion from '@components/form/accordion';

interface Props {
  initialConfiguration: IUpdateChatIntegrationConfiguration;
  updateConfiguration: (configuration: Partial<IUpdateStreamerConfiguration>) => void;
}

interface State {
  configuration: IUpdateChatIntegrationConfiguration;
}

export default class ChatIntegrationConfigurationPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      configuration: this.props.initialConfiguration,
    };

    this.handleEnabledToggle = this.handleEnabledToggle.bind(this);
    this.handleBanlistFormatChange = this.handleBanlistFormatChange.bind(this);
  }

  private handleEnabledToggle(path: string): () => void {
    return () => {
      const enabledPath = [...path.split('.').filter((e) => e !== ''), 'enabled'];
      const enabled = !lodash.get(this.state.configuration, enabledPath);

      const newConfiguration = {
        ...this.state.configuration,
      };

      lodash.set(newConfiguration, enabledPath, enabled);

      this.props.updateConfiguration({
        chatIntegration: newConfiguration,
      });

      this.setState({
        configuration: newConfiguration,
      });
    };
  }

  private handleBanlistFormatChange(e: ChangeEvent<HTMLInputElement>): void {
    const newConfiguration = {
      ...this.state.configuration,
      commands: {
        ...this.state.configuration.commands,
        banlist: {
          enabled: this.state.configuration.commands.banlist.enabled,
          format: e.target.value,
        },
      },
    };

    this.props.updateConfiguration({
      chatIntegration: newConfiguration,
    });

    this.setState({
      configuration: newConfiguration,
    });
  }

  public render(): JSX.Element {
    return (
      <ConfigurationContent>
        <Section>
          <SectionHeader>
            <p>
              If enable will add the
              <a className={'font-medium text-blue-300'} href={'https://www.twitch.tv/justdancerequests'}>
                &nbsp;JustDanceRequests&nbsp;
              </a>
              Bot to your channel.
            </p>

            <SectionHeaderAnnoatation text={'Note'} color={'red'}>
              Banlist will not be enforced for songs requested via chat
            </SectionHeaderAnnoatation>
          </SectionHeader>
          <SectionContent>
            <div className={'flex flex-1 flex-row items-center space-x-4'}>
              <p className={'text-xs md:text-base text-white'}>Enable</p>
              <ToggleButton
                id={'chat-integration-toggle'}
                checked={this.state.configuration.enabled}
                onToggle={this.handleEnabledToggle('')}
              />
            </div>
          </SectionContent>
        </Section>

        <Section>
          <SectionHeader title={'Command Configuration'}>
            <p>Configure the different Commands</p>
          </SectionHeader>
          <SectionContent>
            <Accordion title='Song Request Command' isOpen={false}>
              <Section isSubSection={true}>
                <SectionHeader>
                  <p>
                    Enable to give viewers access to the{' '}
                    <a className={'text-xs bg-gray-700 p-1 rounded font-mono'}>!sr / !songrequest</a> command
                  </p>
                  <p>Using this command viewers can request songs via chat</p>
                </SectionHeader>
                <SectionContent>
                  <div className={'flex flex-1 flex-row items-center space-x-4'}>
                    <p className={'text-xs md:text-base text-white'}>Enable</p>
                    <ToggleButton
                      id={'chat-integration-toggle'}
                      checked={this.state.configuration.commands.songRequest.enabled}
                      onToggle={this.handleEnabledToggle('commands.songRequest')}
                    />
                  </div>
                </SectionContent>
              </Section>
            </Accordion>

            <Accordion title='Queue Command' isOpen={false}>
              <Section isSubSection={true}>
                <SectionHeader>
                  <p>
                    Enable to give viewers access to the{' '}
                    <a className={'text-xs bg-gray-700 p-1 rounded font-mono'}>!q / !queue</a> command
                  </p>
                  <p>Using this command viewers can check what songs are in the queue via chat</p>
                </SectionHeader>
                <SectionContent>
                  <div className={'flex flex-1 flex-row items-center space-x-4'}>
                    <p className={'text-xs md:text-base text-white'}>Enable</p>
                    <ToggleButton
                      id={'chat-integration-toggle'}
                      checked={this.state.configuration.commands.queue.enabled}
                      onToggle={this.handleEnabledToggle('commands.queue')}
                    />
                  </div>
                </SectionContent>
              </Section>
            </Accordion>

            <Accordion title='Queue Position Command' isOpen={false}>
              <Section isSubSection={true}>
                <SectionHeader>
                  <p>
                    Enable to give viewers access to the{' '}
                    <a className={'text-xs bg-gray-700 p-1 rounded font-mono'}>!qp / !queuePosition</a> command
                  </p>
                  <p>
                    Using this command viewers can check at what positions the songs they requested are in the queue
                  </p>
                </SectionHeader>
                <SectionContent>
                  <div className={'flex flex-1 flex-row items-center space-x-4'}>
                    <p className={'text-xs md:text-base text-white'}>Enable</p>
                    <ToggleButton
                      id={'chat-integration-toggle'}
                      checked={this.state.configuration.commands.queuePosition.enabled}
                      onToggle={this.handleEnabledToggle('commands.queuePosition')}
                    />
                  </div>
                </SectionContent>
              </Section>
            </Accordion>

            <Accordion title='Banlist Command' isOpen={false}>
              <Section isSubSection={true}>
                <SectionHeader>
                  <p>
                    Enable to give viewers access to the{' '}
                    <a className={'text-xs bg-gray-700 p-1 rounded font-mono'}>!bl / !banlist</a> command
                  </p>

                  <p>Using this command viewers can see which songs are on the banlist via chat</p>

                  <SectionHeaderAnnoatation text={'Note'} color={'red'}>
                    Banlist will not be enforced for songs requested via chat
                  </SectionHeaderAnnoatation>
                </SectionHeader>
                <SectionContent>
                  <div className={'flex flex-1 flex-row items-center space-x-4'}>
                    <p className={'text-xs md:text-base text-white'}>Enable</p>
                    <ToggleButton
                      id={'chat-integration-toggle'}
                      checked={this.state.configuration.commands.banlist.enabled}
                      onToggle={this.handleEnabledToggle('commands.banlist')}
                    />
                  </div>
                </SectionContent>
              </Section>

              <Section isSubSection={true}>
                <SectionHeader title={'Formatting Guide'}>
                  <p>
                    <a className={'bg-gray-700 p-1 rounded font-mono'}>{'{TITLE}'}</a> - Title of the Song
                  </p>
                  <p>
                    <a className={'bg-gray-700 p-1 rounded font-mono'}>{'{ARTIST}'}</a> - Artist of the Song
                  </p>

                  <SectionHeaderAnnoatation text={'Example'} color={'yellow'} classNames={'space-y-2'}>
                    <p>
                      <a className={'text-xs bg-gray-700 p-1 rounded font-mono'}>{'{TITLE} - {ARTIST}'}</a> ???
                      {' "Bad Habits - Ed Sheeran"'}
                    </p>
                    <p>
                      <a className={'text-xs bg-gray-700 p-1 rounded font-mono'}>{'{TITLE}'}</a> ??? {'"Bad Habits"'}
                    </p>
                    <p>
                      <a className={'text-xs bg-gray-700 p-1 rounded font-mono'}>{'{ARTIST}'}</a> ??? {'"Ed Sheeran"'}
                    </p>
                  </SectionHeaderAnnoatation>
                </SectionHeader>
                <SectionContent>
                  <div className={'flex flex-1 flex-row items-center space-x-4'}>
                    <p className={'text-xs md:text-base text-white'}>Banlist Format</p>
                    <input
                      className={'flex-1 font-mono text-xs md:text-base rounded bg-gray-600 p-1 text-white'}
                      spellCheck={false}
                      value={this.state.configuration.commands.banlist.format}
                      onChange={this.handleBanlistFormatChange}
                    />
                  </div>
                </SectionContent>
              </Section>
            </Accordion>
          </SectionContent>
        </Section>
      </ConfigurationContent>
    );
  }
}
