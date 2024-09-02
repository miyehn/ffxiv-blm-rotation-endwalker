import {localize} from "./Localization";
import {asyncFetchJson, ContentNode, Expandable} from "./Common";
import React from "react";
import {getCurrentThemeColors} from "./ColorTheme";

type EntryProps = {
	name: ContentNode,
	plan: string,
	markers?: string,
}

// The Abyssal Fracture Extreme - Zeromus

function Entry(props: EntryProps) {
	const markersPathPrefix: string = "/ffxiv-blm-rotation-endwalker/gallery/markers/";
	const planPathPrefix: string = "/ffxiv-blm-rotation-endwalker/gallery/plans/";
	return <div>
		<span style={{textDecoration: "underline", cursor: "pointer"}} onClick={()=>{
			// markers (if any)
			if (props.markers !== undefined) {
				asyncFetchJson(markersPathPrefix + props.markers, data => {
					console.log(data);
				});
			}
			// plan
			asyncFetchJson(planPathPrefix + props.plan, data => {
				console.log(data);
			});
		}}>{props.name}</span>
	</div>
}

function Fight(props: {name: ContentNode, plans: EntryProps[]}) {
	return <div className={"paragraph"}>
		<div><b>{props.name}</b></div>
		<div style={{marginLeft: 20}}>
			{props.plans.map(entry => <Entry key={entry.plan} {...entry}/>)}
		</div>
	</div>
}

export function EndwalkerGallery() {
	let colors = getCurrentThemeColors();
	let content = <div>
		<Fight name={"P5S"} plans={[
			{
				name: localize(({en: "rd plan (old)", zh: "rd轴（旧）"})),
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
		<Fight name={localize({en: "P8S P2", zh: "P12S本体"})} plans={[
			{
				name: localize(({en: "rd plan", zh: "rd轴"})),
				plan: "P8S本体 rd轴 ①.txt",
				markers: "p8sp2.txt"
			}
		]}/>
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
		<Fight name={localize({en: "Zurvan (Unreal)", zh: "幻鬼神"})} plans={[
			{
				name: localize(({en: "Zurvan", zh: "幻鬼神"})),
				plan: "幻鬼神.txt",
				markers: "zurvan.txt"
			}
		]}/>
		<Fight name={localize({en: "Zeromus (Extreme)", zh: "泽洛姆斯"})} plans={[
			{
				name: localize(({en: "Zeromus", zh: "泽洛姆斯"})),
				plan: "泽洛姆斯.txt",
				//markers: "zurvan.txt"
			}
		]}/>
		<Fight name={localize({en: "TOP", zh: "绝欧米茄"})} plans={[
			{
				name: localize(({en: "P6 4 BLMs D1 plan", zh: "P6 4黑魔 D1轴"})),
				plan: "绝欧米茄 P6 D1轴.txt",
				markers: "topp6zh.txt"
			},
			{
				name: localize(({en: "P6 4 BLMs D2 plan", zh: "P6 4黑魔 D2轴"})),
				plan: "绝欧米茄 P6 D2轴.txt",
				markers: "topp6zh.txt"
			},
			{
				name: localize(({en: "P6 4 BLMs D3 plan", zh: "P6 4黑魔 D3轴"})),
				plan: "绝欧米茄 P6 D3轴.txt",
				markers: "topp6zh.txt"
			},
			{
				name: localize(({en: "P6 4 BLMs D4 plan", zh: "P6 4黑魔 D4轴"})),
				plan: "绝欧米茄 P6 D4轴.txt",
				markers: "topp6zh.txt"
			},
		]}/>
	</div>;
	return <div style={{
		borderRadius: 4,
		border: "1px solid " + colors.accent,
		padding: "5px 10px",
		margin: "20px 0"
	}}>
		<div className={"paragraph"}>
			<div style={{textAlign: "center"}}>
				<b style={{color: colors.accent}}>{localize({en: "📚 Endwalker Black Mage's Fight Plans Archive 📚"})}</b>
			</div>
		</div>
		<div className={"paragraph"}>{localize({
			en: "This is an effort to showcase and recognize Endwalker Black Mages' love and dedication to this job."
		})}</div>
		{localize({
			en: <div className={"paragraph"}>
				<div>How to view:</div>
				<ol>
					<li>Save or clear all timeline markers and the current timeline slot</li>
					<li>Click on a plan below to load both the fight plan and its corresponding
						markers
					</li>
				</ol>
			</div>
		})}
		<Expandable title={"archive-plans"} titleNode={localize({en: "Plans", zh: "时间轴"})} defaultShow={false} content={content}/>
	</div>

}