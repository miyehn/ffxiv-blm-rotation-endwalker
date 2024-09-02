import {localize, LocalizedContent} from "./Localization";
import {asyncFetchJson, ContentNode, Expandable} from "./Common";
import React from "react";
import {getCurrentThemeColors} from "./ColorTheme";
import {controller} from "../Controller/Controller";

type EntryProps = {
	name: ContentNode,
	plan: string,
	markers?: string,
	details?: LocalizedContent[]
}

function Entry(props: EntryProps) {
	const markersPathPrefix: string = "/ffxiv-blm-rotation-endwalker/gallery/markers/";
	const planPathPrefix: string = "/ffxiv-blm-rotation-endwalker/gallery/plans/";
	let details = props.details !== undefined ? <ul style={{
		margin: "5px 0"
	}}>{
		props.details.map(line => {
			return <li key={line.en as string}>{localize(line)}</li>
		})
	}</ul> : undefined;
	return <div>
		<span style={{textDecoration: "underline", cursor: "pointer"}} onClick={()=>{
			// markers (if any)
			if (props.markers !== undefined) {
				asyncFetchJson(markersPathPrefix + props.markers, data => {
					controller.timeline.deleteAllMarkers();
					controller.timeline.loadCombinedTracksPreset(data);
					controller.updateStats();
					controller.timeline.drawElements();
				});
			} else {
				controller.timeline.deleteAllMarkers();
				controller.updateStats();
				controller.timeline.drawElements();
			}
			// plan
			asyncFetchJson(planPathPrefix + props.plan, data => {
				controller.loadBattleRecordFromFile(data);
				controller.updateAllDisplay();
				controller.autoSave();
			});
		}}>{props.name}</span>
		{details}
	</div>
}

function Fight(props: {name: ContentNode, plans: EntryProps[]}) {
	return <div >
		<div><b>{props.name}</b></div>
		<div style={{marginTop: 10, marginBottom: 10, marginLeft: 20}}>
			{props.plans.map(entry => <Entry key={entry.plan} {...entry}/>)}
		</div>
	</div>
}

export function EndwalkerGallery() {
	let colors = getCurrentThemeColors();
	const zenthonPlanDcLink = "https://discord.com/channels/277897135515762698/1067439017227989103/1103590522435686460";
	const xi12570LogsLink = "https://www.fflogs.com/reports/6kYJxgAjnGPr9TwZ#fight=23";
	const xi12570VideoLink = "https://www.youtube.com/watch?v=dgHsyZ41RH8";
	let content = <div style={{display: "flex", flexDirection: "row", gap: 10, justifyContent: "space-between"}}>
		<div style={{flex: 1}}>
			<Fight name={localize({en: "DSR", zh: "绝龙诗"})} plans={[
				{
					name: localize({en: "P1 Opener", zh: "P1 起手"}),
					plan: "dsr_fight_p1_opener.txt",
					//markers: "dsr_tracks_all_.txt"
				},
				{
					name: "P2",
					plan: "dsr_fight_p2.txt",
					markers: "dsr_tracks_all_p2.txt"
				},
				{
					name: "P3",
					plan: "dsr_fight_p3.txt",
					markers: "dsr_tracks_all_p3.txt"
				},
				{
					name: "P4",
					plan: "dsr_fight_p4.txt",
					markers: "dsr_tracks_all_p4.txt"
				},
				{
					name: localize({en: "P4 to P5 rewind updated for LPDU R2", zh: "P4.5"}),
					plan: "dsr_fight_p4_to_p5_rewind_updatedForLPDUR2.txt",
					markers: "dsr_tracks_all_p4_to_p5_rewind.txt"
				},
				{
					name: "P5",
					plan: "dsr_fight_p5.txt",
					markers: "dsr_tracks_all_p5.txt"
				},
				{
					name: "P6",
					plan: "dsr_fight_p6.txt",
					markers: "dsr_tracks_all_p6_Tischel_edited.txt"
				},
				{
					name: localize({en: "P7 3B3 new with potential Triple delay", zh: "P7 3冰3（可能推迟三连）"}),
					plan: "dsr_fight_p7_3b3_newWithPotentialTripleDelay.txt",
					markers: "dsr_tracks_all_p7.txt",
					details: [
						{
							en: <span>All phases above are by xi12570. <a href={xi12570VideoLink} target={"_blank"} referrerPolicy={"no-referrer"}>Link to video</a>
								, <a href={xi12570LogsLink} target={"_blank"} referrerPolicy={"no-referrer"}>link to logs</a>.
							</span>,
							zh: <span>以上均来自xi12570。<a href={xi12570VideoLink} target={"_blank"} referrerPolicy={"no-referrer"}>视频链接</a>
								，<a href={xi12570LogsLink} target={"_blank"} referrerPolicy={"no-referrer"}>logs链接</a>。</span>
						}
					]
				},
			]}/>
			<Fight name={localize({en: "TOP", zh: "绝欧米茄"})} plans={[
				{
					name: localize(({en: "SPS plan by Zenthon", zh: "咏速轴 - Zenthon"})),
					plan: "TOP_SpS.blm",
					markers: "TOP_2023_04_02.track",
					details: [
						{
							en: <a href={zenthonPlanDcLink} target={"_blank"} referrerPolicy={"no-referrer"}>Link to Discord message (The Balance)</a>,
							zh: <a href={zenthonPlanDcLink} target={"_blank"} referrerPolicy={"no-referrer"}>Discord (The Balance) 消息链接</a>,
						}
					]
				},
				{
					name: localize(({en: "P6 4 BLMs D1 plan", zh: "P6 4黑魔 D1轴"})),
					plan: "绝欧米茄 P6 D1轴.txt",
					markers: "topp6zh.txt",
				},
				{
					name: localize(({en: "P6 4 BLMs D2 plan", zh: "P6 4黑魔 D2轴"})),
					plan: "绝欧米茄 P6 D2轴.txt",
					markers: "topp6zh.txt",
				},
				{
					name: localize(({en: "P6 4 BLMs D3 plan", zh: "P6 4黑魔 D3轴"})),
					plan: "绝欧米茄 P6 D3轴.txt",
					markers: "topp6zh.txt",
				},
				{
					name: localize(({en: "P6 4 BLMs D4 plan", zh: "P6 4黑魔 D4轴"})),
					plan: "绝欧米茄 P6 D4轴.txt",
					markers: "topp6zh.txt",
					details: [
						{
							en: "All 4 above: GCD threshold 2.43",
							zh: "以上4个轴均为gcd阈值2.43"
						}
					]
				},
			]}/>
		</div>
		<div style={{flex: 1}}>
			<Fight name={"P9S"} plans={[
				{
					name: localize(({en: "2.42 rd plan", zh: "2.42 rd轴"})),
					plan: "P9S 2.42 rd轴 ①.txt",
					markers: "p9s.txt"
				},
				{
					name: localize(({en: "Speedrun", zh: "速刷"})),
					plan: "P9S 速刷.txt",
					markers: "p9s.txt"
				},
				{
					name: localize(({en: "No B3/B4", zh: "零冰3冰4"})),
					plan: "P9S 零冰3冰4.txt",
					markers: "p9s.txt"
				}
			]}/>
			<Fight name={"P10S"} plans={[
				{
					name: localize(({en: "rd plan", zh: "rd轴"})),
					plan: "P10S rd轴 ①.txt",
					markers: "p10s.txt"
				},
				{
					name: localize(({en: "Speedrun", zh: "速刷"})),
					plan: "P10S 速刷.txt",
					markers: "p10s.txt"
				}
			]}/>
			<Fight name={"P11S"} plans={[
				{
					name: localize(({en: "rd plan", zh: "rd轴"})),
					plan: "P11S rd轴 ①.txt",
					markers: "p11s.txt"
				}
			]}/>
			<Fight name={localize({en: "P12S Doorboss", zh: "P12S门神"})} plans={[
				{
					name: localize(({en: "rd plan", zh: "rd轴"})),
					plan: "P12S门神 rd轴 ①.txt",
					markers: "p12sp1.txt"
				}
			]}/>
			<Fight name={localize({en: "P12S P2", zh: "P12S本体"})} plans={[
				{
					name: localize(({en: "rd plan", zh: "rd轴"})),
					plan: "P12S本体 rd轴 ①.txt",
					markers: "p12sp2.txt"
				},
				{
					name: localize(({en: "Speedrun", zh: "速刷"})),
					plan: "P12S本体 速刷.txt",
					markers: "p12sp2.txt"
				}
			]}/>
		</div>
		<div style={{flex: 1}}>
			<Fight name={"P5S"} plans={[
				{
					name: localize(({en: "rd plan (old, can't be fully loaded)", zh: "rd轴（旧，无法完整加载）"})),
					plan: "p5s rd轴 旧.txt",
					markers: "p5s.txt"
				}
			]}/>
			<Fight name={"P6S"} plans={[
				{
					name: localize(({en: "rd plan", zh: "rd轴"})),
					plan: "p6s rd轴 ①.txt",
					markers: "p6s.txt"
				}
			]}/>
			<Fight name={"P7S"} plans={[
				{
					name: localize(({en: "rd plan", zh: "rd轴"})),
					plan: "P7S rd轴 ①.txt",
					markers: "p7s.txt"
				}
			]}/>
			{/*
		<Fight name={localize({en: "P8S Doorboss", zh: "P12S门神"})} plans={[
			{
				name: localize(({en: "Doorboss plan (snake)", zh: "门神时间轴（蛇）"})),
				plan: "P8S门神时间轴（蛇）.txt",
				//markers: "p8sp1.txt"
			}
		]}/>
		*/}
			<Fight name={localize({en: "P8S P2", zh: "P8S本体"})} plans={[
				{
					name: localize(({en: "rd plan", zh: "rd轴"})),
					plan: "P8S本体 rd轴 ①.txt",
					markers: "p8sp2.txt"
				}
			]}/>
			<Fight name={localize({en: "Zurvan (Unreal)", zh: "幻鬼神"})} plans={[
				{
					name: localize(({en: "Zurvan", zh: "幻鬼神"})),
					plan: "幻鬼神.txt",
					markers: "zurvan.txt"
				}
			]}/>
			<Fight name={localize({en: "Zeromus (Extreme)", zh: "极泽洛姆斯"})} plans={[
				{
					name: localize(({en: "Zeromus", zh: "极泽洛姆斯"})),
					plan: "泽洛姆斯.txt",
					//markers: "zurvan.txt"
				}
			]}/>
		</div>
	</div>;
	return <div style={{
		borderRadius: 4,
		border: "1px solid " + colors.accent,
		padding: "10px 20px",
		margin: "20px 0"
	}}>
		<div className={"paragraph"}>
			<div style={{textAlign: "center"}}>
				<b style={{color: colors.accent}}>{localize({
					en: "📚 Endwalker Black Mage's Fight Plans Gallery 📚",
					zh: "📚 6.X黑魔法师副本轴展示 📚",
				})}</b>
			</div>
		</div>
		<div className={"paragraph"}>{localize({
			en: "This collection of player submissions showcases Endwalker Black Mages' love and dedication to this job.",
			zh: "这些是来自黑魔玩家们的时间轴投稿，在此展示以纪念6.X时期黑魔们对这个职业的喜爱和热情。"
		})}</div>
		{localize({
			en: <div className={"paragraph"}>
				<div>{localize({en: "How to view:", zh: "如何查看："})}</div>
				<ol>
					<li>{localize({
						en: "Make sure all timeline markers and the current timeline slot are saved to file because they will be overwritten",
						zh: "确保当前所有时间轴和标记 (markers) 都已被保存到文件，因为它们会在加载时被覆盖"
					})}</li>
					<li>{localize({
						en: "Click on a plan below to load both the fight plan and its corresponding timeline markers",
						zh: "点击下方的时间轴会加载那个轴和对应的标记"
					})}</li>
				</ol>
			</div>
		})}
		<Expandable title={"archive-plans"} titleNode={localize({en: "Plans", zh: "时间轴"})} defaultShow={false}
					content={content}/>
	</div>

}